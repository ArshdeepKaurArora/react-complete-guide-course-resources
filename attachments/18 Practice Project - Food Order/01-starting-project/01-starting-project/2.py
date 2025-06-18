class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    """
    :type l1: Optional[ListNode]
    :type l2: Optional[ListNode]
    :rtype: Optional[ListNode]
    """
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        # Get values from the nodes, default to 0 if node is None
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        
        # Calculate sum and new carry
        total = x + y + carry
        carry = total // 10
        digit = total % 10
        
        # Create new node with the calculated digit
        current.next = ListNode(digit)
        current = current.next
        
        # Move to next nodes if they exist
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next

# Test case
# Create linked lists: 2->4->3 and 5->6->4
l1 = ListNode(2)
l1.next = ListNode(4)
l1.next.next = ListNode(3)

l2 = ListNode(5)
l2.next = ListNode(6)
l2.next.next = ListNode(4)

result = addTwoNumbers(l1, l2)

# Print the result
current = result
while current:
    print(current.val, end=" -> ")
    current = current.next
print("None") 