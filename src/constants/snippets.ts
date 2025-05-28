export const DEFAULT_CODE_SNIPPETS: Record<string, string> = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

// Calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));
`,
  typescript: `// TypeScript Example
console.log("Hello, World!");

// Calculate factorial
function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));
`,
  python: `# Python Example
print("Hello, World!")

# Calculate factorial
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

print(f"Factorial of 5: {factorial(5)}")
`,
  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Calculate factorial
        System.out.println("Factorial of 5: " + factorial(5));
    }
    
    public static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}
`,
  go: `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Calculate factorial
    fmt.Printf("Factorial of 5: %d\\n", factorial(5))
}

func factorial(n int) int {
    if n == 0 || n == 1 {
        return 1
    }
    return n * factorial(n-1)
}
`,
  rust: `// Rust Example
fn main() {
    println!("Hello, World!");
    
    // Calculate factorial
    println!("Factorial of 5: {}", factorial(5));
}

fn factorial(n: u64) -> u64 {
    if n == 0 || n == 1 {
        return 1;
    }
    n * factorial(n - 1)
}
`
};