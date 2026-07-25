import type { CodeSnippet } from '../types';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'js-async-fetch',
    language: 'javascript',
    title: 'Async Fetch API',
    difficulty: 'easy',
    code: `async function fetchUserData(userId) {
  const url = \`https://api.github.com/users/\${userId}\`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    const data = await response.json();
    return { id: data.id, login: data.login };
  } catch (error) {
    console.error("Fetch failed: ", error);
    return null;
  }
}`
  },
  {
    id: 'ts-generic-interface',
    language: 'typescript',
    title: 'Generic Interface & Class',
    difficulty: 'medium',
    code: `interface Repository<T> {
  findById(id: string): Promise<T>;
  save(item: T): Promise<void>;
}

class UserRepo implements Repository<User> {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("Not found");
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
}`
  },
  {
    id: 'py-list-comprehension',
    language: 'python',
    title: 'Decorators and Comprehensions',
    difficulty: 'easy',
    code: `def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n: int) -> list[int]:
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return [x for x in sequence if x % 2 == 0]`
  },
  {
    id: 'java-stream-api',
    language: 'java',
    title: 'Streams and Lambdas',
    difficulty: 'medium',
    code: `import java.util.List;
import java.util.stream.Collectors;

public class UserFilter {
    public List<String> getActiveAdminEmails(List<User> users) {
        return users.stream()
            .filter(u -> u.isActive() && u.isAdmin())
            .map(User::getEmail)
            .sorted()
            .collect(Collectors.toList());
    }
}`
  },
  {
    id: 'c-pointer-manipulation',
    language: 'c',
    title: 'String Copy with Pointers',
    difficulty: 'hard',
    code: `#include <stdio.h>

void mystrcpy(char *dest, const char *src) {
    while (*src != '\\0') {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\\0';
}

int main() {
    char source[] = "Programmer typing test";
    char destination[50];
    mystrcpy(destination, source);
    printf("%s\\n", destination);
    return 0;
}`
  },
  {
    id: 'cpp-vector-template',
    language: 'c++',
    title: 'Vector Template and Iterator',
    difficulty: 'medium',
    code: `#include <iostream>
#include <vector>
#include <algorithm>

template <typename T>
void printAndSort(std::vector<T>& vec) {
    std::sort(vec.begin(), vec.end());
    for (const auto& item : vec) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
}`
  },
  {
    id: 'cs-async-linq',
    language: 'c#',
    title: 'LINQ Query & Async Task',
    difficulty: 'medium',
    code: `using System;
using System.Linq;
using System.Threading.Tasks;

public class DatabaseHelper {
    public async Task<int> GetActiveUserCountAsync(DbContext db) {
        var activeUsers = await db.Users
            .Where(u => u.IsActive && u.Role == "Admin")
            .Select(u => u.Id)
            .ToListAsync();
        return activeUsers.Count;
    }
}`
  },
  {
    id: 'go-goroutines',
    language: 'go',
    title: 'Goroutine Channel Select',
    difficulty: 'medium',
    code: `package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Print("Working...")
	time.Sleep(time.Second)
	fmt.Println("done")
	done <- true
}

func main() {
	done := make(chan bool, 1)
	go worker(done)
	<-done
}`
  },
  {
    id: 'rust-ownership',
    language: 'rust',
    title: 'Pattern Matching and Option',
    difficulty: 'hard',
    code: `fn find_even_number(numbers: &[i32]) -> Option<i32> {
    for &num in numbers.iter() {
        match num % 2 {
            0 => return Some(num),
            _ => continue,
        }
    }
    None
}

fn main() {
    let list = vec![1, 3, 5, 8, 9];
    if let Some(even) = find_even_number(&list) {
        println!("Found: {}", even);
    }
}`
  },
  {
    id: 'php-oop',
    language: 'php',
    title: 'PHP Class and Interfaces',
    difficulty: 'easy',
    code: `<?php

interface LoggerInterface {
    public function log(string $message): void;
}

class FileLogger implements LoggerInterface {
    private string $filePath;

    public function __construct(string $filePath) {
        $this->filePath = $filePath;
    }

    public function log(string $message): void {
        file_put_contents($this->filePath, $message . PHP_EOL, FILE_APPEND);
    }
}`
  },
  {
    id: 'html-semantic',
    language: 'html',
    title: 'Semantic HTML Structure',
    difficulty: 'easy',
    code: `<article class="card">
  <header class="card-header">
    <h2 class="text-xl font-bold">SEO Best Practices</h2>
    <p>Published: <time datetime="2026-07-25">July 25, 2026</time></p>
  </header>
  <main class="card-content">
    <p>Semantic markup helps search engines index content.</p>
    <img src="seo-chart.jpg" alt="SEO analytics chart" loading="lazy" />
  </main>
  <footer class="card-footer">
    <a href="/blog/seo-practices">Read more</a>
  </footer>
</article>`
  },
  {
    id: 'css-variables',
    language: 'css',
    title: 'CSS Variables & Flexbox',
    difficulty: 'easy',
    code: `:root {
  --primary-color: #3b82f6;
  --spacing-unit: 1rem;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1.5);
  padding: var(--spacing-unit);
  border-radius: 8px;
  background-color: rgb(24 24 27);
}`
  },
  {
    id: 'sql-aggregation',
    language: 'sql',
    title: 'SQL Join & Aggregation',
    difficulty: 'medium',
    code: `SELECT 
    d.department_name,
    COUNT(e.employee_id) AS total_employees,
    ROUND(AVG(e.salary), 2) AS average_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
WHERE e.is_active = 1
GROUP BY d.department_name
HAVING AVG(e.salary) > 50000
ORDER BY average_salary DESC;`
  },
  {
    id: 'json-schema',
    language: 'json',
    title: 'JSON Data Schema',
    difficulty: 'easy',
    code: `{
  "userId": "usr_9928A",
  "name": "Devin Coder",
  "isActive": true,
  "roles": ["developer", "admin"],
  "preferences": {
    "theme": "dark",
    "fontSize": 14,
    "editor": {
      "tabSize": 2,
      "wordWrap": "on"
    }
  }
}`
  },
  {
    id: 'jsx-component',
    language: 'react jsx',
    title: 'React Functional Component',
    difficulty: 'medium',
    code: `import React, { useState, useEffect } from 'react';

export const AutoFocusInput = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-3 py-2 border rounded"
        placeholder="Type here..."
      />
      <button onClick={() => onComplete(inputValue)}>
        Submit
      </button>
    </div>
  );
};`
  }
];

export const getSnippetByLanguage = (language: string): CodeSnippet => {
  const filtered = CODE_SNIPPETS.filter(s => s.language.toLowerCase() === language.toLowerCase());
  if (filtered.length === 0) return CODE_SNIPPETS[0];
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

export const getSnippetLanguages = (): string[] => {
  const langs = CODE_SNIPPETS.map(s => s.language);
  return Array.from(new Set(langs));
};
