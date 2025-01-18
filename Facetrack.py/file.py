import cv2
import numpy as np

# Function to count the number of fingers
def count_fingers(frame, contours):
    if len(contours) == 0:
        return 0
    
    # Find the largest contour based on area
    contour = max(contours, key=cv2.contourArea)
    
    # Approximate the contour to simplify it and reduce noise
    epsilon = 0.02 * cv2.arcLength(contour, True)
    approx_contour = cv2.approxPolyDP(contour, epsilon, True)

    # Get the convex hull of the simplified contour
    hull = cv2.convexHull(approx_contour)

    # Get the convexity defects
    defects = cv2.convexityDefects(approx_contour, cv2.convexHull(approx_contour, returnPoints=False))

    # If no convexity defects, it's likely a closed fist or no hand
    if defects is None:
        return 0
    
    count = 0
    for i in range(defects.shape[0]):
        s, e, f, d = defects[i, 0]
        start = tuple(approx_contour[s][0])
        end = tuple(approx_contour[e][0])
        far = tuple(approx_contour[f][0])
        
        # If the defect is large enough, it's considered a "finger"
        if d > 10000:
            count += 1
    
    # The number of fingers is the number of defects + 1 (for the palm)
    return count + 1

# Initialize webcam
cap = cv2.VideoCapture(0)

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

while True:
    # Capture the video frame
    ret, frame = cap.read()

    # If frame is not captured correctly, exit
    if not ret:
        print("Error: Failed to grab frame")
        break
    
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Apply a binary threshold to the image
    _, thresh = cv2.threshold(blurred, 60, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours of the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Filter out small contours (likely noise or irrelevant contours)
    contours = [cnt for cnt in contours if cv2.contourArea(cnt) > 1000]

    if len(contours) == 0:
        continue
    
    # Draw contours on the frame (for debugging)
    cv2.drawContours(frame, contours, -1, (0, 255, 0), 3)
    
    # Call the function to count fingers
    num_fingers = count_fingers(frame, contours)
    
    # Display the number of fingers on the frame
    cv2.putText(frame, f'Fingers: {num_fingers}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
    
    # Show the frame
    cv2.imshow("Finger Count", frame)
    
    # Exit the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()
