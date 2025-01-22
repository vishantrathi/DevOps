def vishant(valid_digits, fd):   
    pd = []
    for digit, valid in valid_digits.items():     
        diff = sum(1 for a, b in zip(fd, valid) if a != b)
        if diff == 0:
            pd.append(digit)
        elif diff == 1:  
            pd.append(digit)
    return pd

def solve():    
    sd = [input().strip() for _ in range(3)]  

    fad = [input().strip() for _ in range(3)]   
   
    valid_digits = {}
    for i in range(10):
        valid_digits[i] = ''.join(sd[j][i*3:(i+1)*3] for j in range(3))   
   
    faulty_number = []
    for i in range(len(fad[0]) // 3):
        fd = ''.join(fad[j][i*3:(i+1)*3] for j in range(3))
        pd = vishant(valid_digits, fd)
        if not pd:
            print("Invalid",end='')
            return
        faulty_number.append(pd) 

    from itertools import product
    ts = 0
    for possible in product(*faulty_number):
        ts += int(''.join(map(str, possible)))    
    print(ts,end='')
solve()
