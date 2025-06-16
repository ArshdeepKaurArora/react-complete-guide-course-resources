def maxDiff(num):
    num_str = str(num)
    digits = set(num_str)
    max_diff = 0
    
    # Try all possible digit replacements
    for x in digits:
        for y in range(10):
            # Skip if replacing first digit with 0
            if x == num_str[0] and y == 0:
                continue
                
            # Replace all occurrences of x with y
            new_num = int(num_str.replace(x, str(y)))
            
            # Try all possible replacements for the second number
            for a in digits:
                for b in range(10):
                    # Skip if replacing first digit with 0
                    if a == num_str[0] and b == 0:
                        continue
                        
                    # Replace all occurrences of a with b
                    second_num = int(num_str.replace(a, str(b)))
                    
                    # Update max difference
                    if second_num != 0:  # Ensure number is not 0
                        max_diff = max(max_diff, abs(new_num - second_num))
    
    return max_diff

print(maxDiff(123456)) 