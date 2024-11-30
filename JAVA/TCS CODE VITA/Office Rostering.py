def main():
    N, M = map(int, input().split())
    friendships = [set() for _ in range(N)]
    for _ in range(M):
        u, v = map(int, input().split())
        friendships[u].add(v)
        friendships[v].add(u)
    K = int(input())
    wfo = [True] * N
    total_attendance = N
    days = 1
    while total_attendance < K:
        next_wfo = [False] * N
        for i in range(N):
            friend_count = sum(1 for friend in friendships[i] if wfo[friend])
            
            if wfo[i]:
                if friend_count == 3:
                    next_wfo[i] = True
            else:
                if friend_count < 3:
                    next_wfo[i] = True 
        wfo = next_wfo
        daily_attendance = sum(wfo)
        total_attendance += daily_attendance
        days += 1
   
    print(days, end='')

if __name__ == "__main__":
    main()