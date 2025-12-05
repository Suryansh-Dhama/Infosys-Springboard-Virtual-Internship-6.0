import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { Download, FileText, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

// Define the Note interface
interface Note {
  id: number;
  title: string;
  subject: string;
  uploadedBy: string;
  date: string;
  size: string;
  content: string;
}

export default function Notes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Advanced JavaScript Concepts',
      subject: 'Programming',
      uploadedBy: 'Prof. Alan Turing',
      date: '2025-11-20',
      size: '2.4 MB',
      content: `# Advanced JavaScript Concepts

## Table of Contents
1. Closures and Scope
2. Prototypes and Inheritance
3. Asynchronous JavaScript
4. Modules and Namespacing
5. Memory Management
6. Performance Optimization

---

## 1. Closures and Scope

### What is a Closure?
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

### Practical Example
\`\`\`javascript
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer Variable: ' + outerVariable);
    console.log('Inner Variable: ' + innerVariable);
  }
}

const newFunction = outerFunction('outside');
newFunction('inside'); // Outer Variable: outside, Inner Variable: inside
\`\`\`

### Common Use Cases
1. Data Encapsulation
2. Factory Functions
3. Event Handlers
4. Callback Functions

---

## 2. Prototypes and Inheritance

### Prototype Chain
Every JavaScript object has a prototype, which is another object that serves as a template from which it inherits methods and properties.

### Creating Objects with Prototypes
\`\`\`javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a noise.\`);
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(\`\${this.name} barks.\`);
}
\`\`\`

### ES6 Classes vs Prototypes
ES6 classes are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.

---

## 3. Asynchronous JavaScript

### Callbacks
Callbacks are functions passed as arguments to other functions to be executed later.

### Promises
Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise.then(result => {
  console.log(result); // Success!
}).catch(error => {
  console.log(error);
});
\`\`\`

### Async/Await
Async/await is built on top of promises and provides a more readable way to work with asynchronous code.

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
\`\`\`

---

## 4. Modules and Namespacing

### ES6 Modules
ES6 introduced a standardized module system for JavaScript.

\`\`\`javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(2, 3)); // 5
\`\`\`

### CommonJS (Node.js)
CommonJS is the module system used in Node.js.

\`\`\`javascript
// math.js
module.exports.add = (a, b) => a + b;

// main.js
const { add } = require('./math.js');
\`\`\`

---

## 5. Memory Management

### Garbage Collection
JavaScript automatically manages memory through garbage collection.

### Memory Leaks
Common causes of memory leaks:
1. Forgotten timers
2. Event listeners not removed
3. Global variables
4. Closures holding references

### Best Practices
1. Remove event listeners when not needed
2. Clear intervals and timeouts
3. Use WeakMap and WeakSet for object references
4. Avoid global variables

---

## 6. Performance Optimization

### Minimizing DOM Manipulation
Batch DOM updates to reduce reflows and repaints.

### Efficient Loops
\`\`\`javascript
// Slow
for (let i = 0; i < arr.length; i++) { }

// Faster
for (let i = 0, len = arr.length; i < len; i++) { }
\`\`\`

### Debouncing and Throttling
Techniques to limit the rate of function execution.

### Lazy Loading
Load resources only when needed.

---

## Conclusion
Understanding these advanced JavaScript concepts is crucial for building efficient, scalable applications. Practice implementing these patterns in your projects to deepen your understanding.

## References
1. MDN Web Docs - JavaScript Guide
2. "You Don't Know JS" by Kyle Simpson
3. ECMAScript specification
4. JavaScript.info
5. Professional JavaScript for Web Developers by Matt Frisbie`
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      subject: 'Web Development',
      uploadedBy: 'Dr. Ada Lovelace',
      date: '2025-11-18',
      size: '1.8 MB',
      content: `# React Hooks Deep Dive

## Table of Contents
1. Introduction to Hooks
2. useState Hook
3. useEffect Hook
4. useContext Hook
5. useReducer Hook
6. useCallback and useMemo
7. useRef Hook
8. Custom Hooks
9. Rules of Hooks
10. Performance Considerations

---

## 1. Introduction to Hooks

### What are Hooks?
Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.

### Why Hooks?
- Reuse stateful logic between components
- Simplify complex components
- Eliminate confusing aspects of classes
- Work with existing code

### Basic Hook Example
\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked $\{count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

---

## 2. useState Hook

### Basic Usage
\`\`\`javascript
const [state, setState] = useState(initialState);
\`\`\`

### Functional Updates
\`\`\`javascript
setState(prevState => prevState + 1);
\`\`\`

### State Batching
React batches multiple state updates for performance.

### Lazy Initialization
\`\`\`javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
\`\`\`

---

## 3. useEffect Hook

### Purpose
The Effect Hook lets you perform side effects in function components.

### Common Patterns
\`\`\`javascript
// Runs after every render
useEffect(() => {
  // Side effect
});

// Runs only on mount
useEffect(() => {
  // Side effect
}, []);

// Runs when dependencies change
useEffect(() => {
  // Side effect
}, [dependency1, dependency2]);
\`\`\`

### Cleanup
\`\`\`javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
\`\`\`

---

## 4. useContext Hook

### Context API
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

\`\`\`javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
\`\`\`

---

## 5. useReducer Hook

### When to Use
useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

\`\`\`javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
\`\`\`

---

## 6. useCallback and useMemo

### useCallback
Returns a memoized callback.

\`\`\`javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
\`\`\`

### useMemo
Returns a memoized value.

\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

---

## 7. useRef Hook

### Accessing DOM Elements
\`\`\`javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
\`\`\`

### Mutable Values
\`\`\`javascript
const intervalRef = useRef();
useEffect(() => {
  intervalRef.current = setInterval(() => {
    // Something
  }, 1000);
  return () => {
    clearInterval(intervalRef.current);
  };
}, []);
\`\`\`

---

## 8. Custom Hooks

### Creating Custom Hooks
Custom Hooks are a mechanism to reuse stateful logic.

\`\`\`javascript
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
\`\`\`

---

## 9. Rules of Hooks

### Only Call Hooks at the Top Level
Don't call Hooks inside loops, conditions, or nested functions.

### Only Call Hooks from React Functions
Call them from React function components or custom Hooks.

### ESLint Plugin
Use eslint-plugin-react-hooks to enforce these rules.

---

## 10. Performance Considerations

### Optimizing Re-renders
1. Use React.memo for component memoization
2. Memoize callbacks with useCallback
3. Memoize expensive computations with useMemo
4. Avoid creating objects/arrays in render

### Profiling
Use React DevTools Profiler to identify performance bottlenecks.

---

## Conclusion
Hooks provide a powerful and flexible way to manage state and side effects in React applications. Understanding when and how to use each hook is crucial for building efficient React applications.

## Further Reading
1. React Documentation - Hooks
2. "Learning React" by Alex Banks and Eve Porcello
3. React Hooks Cheatsheet
4. Advanced React Patterns`
    },
    {
      id: 3,
      title: 'Database Design Principles',
      subject: 'Computer Science',
      uploadedBy: 'Prof. Donald Knuth',
      date: '2025-11-15',
      size: '3.2 MB',
      content: `# Database Design Principles

## Table of Contents
1. Introduction to Database Design
2. Entity-Relationship Modeling
3. Normalization
4. Relational Algebra
5. SQL Fundamentals
6. Indexing Strategies
7. Transaction Management
8. Concurrency Control
9. Backup and Recovery
10. Security Considerations
11. Performance Tuning
12. NoSQL Databases

---

## 1. Introduction to Database Design

### What is a Database?
A database is an organized collection of structured information, or data, typically stored electronically in a computer system.

### Database Management System (DBMS)
Software that interacts with end users, applications, and the database itself to capture and analyze data.

### Types of Databases
1. Relational (SQL)
2. Document-oriented (MongoDB)
3. Key-value stores (Redis)
4. Graph databases (Neo4j)
5. Column-family (Cassandra)

---

## 2. Entity-Relationship Modeling

### Entities
Entities represent real-world objects or concepts.

### Attributes
Attributes are properties or characteristics of entities.

### Relationships
Relationships define how entities are related to each other.

### ER Diagram Components
1. Entities (rectangles)
2. Attributes (ellipses)
3. Relationships (diamonds)
4. Primary keys (underlined)
5. Cardinality ratios

### Example ER Diagram
\`\`\`
[STUDENT] ----<enrolls_in>---- [COURSE]
    |                              |
(id)                           (course_id)
(name)                         (title)
(email)                        (credits)
\`\`\`

---

## 3. Normalization

### Purpose
Normalization is the process of organizing data to minimize redundancy and dependency.

### Normal Forms
1. First Normal Form (1NF): Atomic values
2. Second Normal Form (2NF): 1NF + no partial dependencies
3. Third Normal Form (3NF): 2NF + no transitive dependencies
4. Boyce-Codd Normal Form (BCNF): Stronger version of 3NF
5. Fourth Normal Form (4NF): No multi-valued dependencies

### Example: 1NF to 3NF
\`\`\`
Original Table:
| Student_ID | Student_Name | Course_1 | Course_2 | Course_3 |

1NF:
| Student_ID | Student_Name | Course |

2NF:
Students: | Student_ID | Student_Name |
Enrollments: | Student_ID | Course |

3NF:
Students: | Student_ID | Student_Name |
Courses: | Course_ID | Course_Name |
Enrollments: | Student_ID | Course_ID |
\`\`\`

---

## 4. Relational Algebra

### Basic Operations
1. Selection (σ): Select rows based on condition
2. Projection (π): Select columns
3. Union (∪): Combine two relations
4. Set Difference (-): Rows in first but not second
5. Cartesian Product (×): Combine every row with every other row
6. Rename (ρ): Change relation or attribute names

### Extended Operations
1. Intersection (∩): Rows common to both relations
2. Join: Combine related tuples from two relations
3. Division (÷): Tuples that match all tuples in another relation

### Example Queries
\`\`\`
Selection: σ salary>50000(Employee)
Projection: π name,salary(Employee)
Join: Employee ⨝ Department
\`\`\`

---

## 5. SQL Fundamentals

### Data Definition Language (DDL)
\`\`\`sql
CREATE TABLE Employees (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT,
  salary DECIMAL(10,2)
);

ALTER TABLE Employees ADD COLUMN email VARCHAR(255);

DROP TABLE Employees;
\`\`\`

### Data Manipulation Language (DML)
\`\`\`sql
INSERT INTO Employees VALUES (1, 'John Doe', 101, 60000.00);

UPDATE Employees SET salary = 65000.00 WHERE emp_id = 1;

DELETE FROM Employees WHERE emp_id = 1;
\`\`\`

### Data Query Language (DQL)
\`\`\`sql
SELECT name, salary FROM Employees WHERE department_id = 101;

SELECT E.name, D.department_name 
FROM Employees E 
JOIN Departments D ON E.department_id = D.department_id;
\`\`\`

---

## 6. Indexing Strategies

### What is an Index?
An index is a data structure that improves the speed of data retrieval operations on a database table.

### Types of Indexes
1. Single-column indexes
2. Composite indexes
3. Unique indexes
4. Partial indexes
5. Functional indexes

### Creating Indexes
\`\`\`sql
CREATE INDEX idx_employee_name ON Employees(name);

CREATE UNIQUE INDEX idx_employee_email ON Employees(email);

CREATE INDEX idx_employee_dept_salary ON Employees(department_id, salary);
\`\`\`

### Index Performance Considerations
- Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE
- Too many indexes can degrade performance
- Choose columns wisely for indexing

---

## 7. Transaction Management

### ACID Properties
1. Atomicity: All operations succeed or all fail
2. Consistency: Database remains in valid state
3. Isolation: Concurrent transactions don't interfere
4. Durability: Committed changes persist

### Transaction States
1. Active
2. Partially Committed
3. Committed
4. Failed
5. Aborted

### Transaction Control
\`\`\`sql
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Or in case of error
ROLLBACK;
\`\`\`

---

## 8. Concurrency Control

### Problems Without Concurrency Control
1. Lost Update Problem
2. Dirty Read Problem
3. Non-repeatable Read Problem
4. Phantom Read Problem

### Lock-Based Protocols
1. Shared Locks (Read Locks)
2. Exclusive Locks (Write Locks)

### Two-Phase Locking (2PL)
1. Growing Phase: Acquire locks
2. Shrinking Phase: Release locks

### Timestamp-Based Protocols
Each transaction gets a timestamp, and conflicts are resolved based on timestamps.

---

## 9. Backup and Recovery

### Types of Backups
1. Full Backup: Complete database copy
2. Incremental Backup: Changes since last backup
3. Differential Backup: Changes since last full backup

### Recovery Techniques
1. Log-based Recovery: Using transaction logs
2. Checkpoint-based Recovery: Periodic consistent states
3. Shadow Paging: Maintaining two page tables

### Point-in-Time Recovery
Restore database to a specific point in time using transaction logs.

---

## 10. Security Considerations

### Authentication
Verify the identity of users trying to access the database.

### Authorization
Determine what operations authenticated users can perform.

### Access Control
\`\`\`sql
GRANT SELECT, INSERT ON Employees TO analyst;
REVOKE INSERT ON Employees FROM analyst;
\`\`\`

### Encryption
1. Data-at-rest encryption
2. Data-in-transit encryption
3. Column-level encryption

### Auditing
Track database activities for security monitoring.

---

## 11. Performance Tuning

### Query Optimization
1. Use EXPLAIN to analyze query execution plans
2. Create appropriate indexes
3. Avoid SELECT *
4. Use LIMIT for large result sets

### Database Configuration
1. Buffer pool size
2. Query cache settings
3. Connection pooling
4. Parallel processing settings

### Monitoring Tools
1. Query execution time
2. Index usage statistics
3. Lock wait times
4. Disk I/O metrics

---

## 12. NoSQL Databases

### Document Stores (MongoDB)
Store semi-structured data in document format (JSON-like).

### Key-Value Stores (Redis)
Simple key-value pairs with high performance.

### Column-Family (Cassandra)
Optimized for large datasets distributed across many servers.

### Graph Databases (Neo4j)
Store data in nodes and relationships for complex connections.

### When to Use NoSQL
1. Massive scale requirements
2. Rapidly changing schemas
3. Unstructured data
4. Horizontal scaling needs

---

## Conclusion
Effective database design is fundamental to building robust, scalable applications. Understanding normalization, indexing strategies, and transaction management will help you create efficient and reliable database systems.

## Recommended Resources
1. "Database System Concepts" by Silberschatz, Korth, and Sudarshan
2. "Fundamentals of Database Systems" by Elmasri and Navathe
3. SQL tutorials on W3Schools and SQLZoo
4. Database design courses on Coursera and edX`
    },
  ]);

  const handleDownloadNote = (note: Note) => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Set document properties
      doc.setProperties({
        title: note.title,
        subject: note.subject,
        author: note.uploadedBy,
      });
      
      // Add title page
      doc.setFontSize(24);
      doc.setTextColor(59, 130, 246); // Primary blue color
      doc.setFont(undefined, 'bold');
      doc.text(note.title, 105, 40, { align: 'center' });
      
      // Add subtitle
      doc.setFontSize(16);
      doc.setTextColor(100, 100, 100);
      doc.setFont(undefined, 'normal');
      doc.text(note.subject, 105, 55, { align: 'center' });
      
      // Add author
      doc.setFontSize(14);
      doc.setTextColor(70, 70, 70);
      doc.text(`Prepared by: ${note.uploadedBy}`, 105, 70, { align: 'center' });
      
      // Add date
      const dateStr = new Date(note.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      doc.text(`Date: ${dateStr}`, 105, 80, { align: 'center' });
      
      // Add horizontal line
      doc.setDrawColor(200, 200, 200);
      doc.line(30, 90, 180, 90);
      
      // Add table of contents title
      doc.setFontSize(18);
      doc.setTextColor(59, 130, 246);
      doc.setFont(undefined, 'bold');
      doc.text('Table of Contents', 105, 110, { align: 'center' });
      
      // Process content
      let yPosition = 130;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      
      // Split content into lines
      const contentLines = doc.splitTextToSize(note.content, 170);
      
      // Add content to PDF
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      contentLines.forEach((line, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Handle markdown-like formatting
        if (line.startsWith('# ')) {
          doc.setFont(undefined, 'bold');
          doc.setFontSize(18);
          doc.setTextColor(59, 130, 246);
          doc.text(line.substring(2), 20, yPosition);
          doc.setFontSize(11);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
        } else if (line.startsWith('## ')) {
          doc.setFont(undefined, 'bold');
          doc.setFontSize(16);
          doc.setTextColor(79, 70, 229);
          doc.text(line.substring(3), 20, yPosition);
          doc.setFontSize(11);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(0, 0, 0);
        } else if (line.startsWith('### ')) {
          doc.setFont(undefined, 'bold');
          doc.setFontSize(14);
          doc.text(line.substring(4), 20, yPosition);
          doc.setFontSize(11);
          doc.setFont(undefined, 'normal');
        } else if (line.startsWith('- ')) {
          doc.text('• ' + line.substring(2), 25, yPosition);
        } else if (line.startsWith('```')) {
          // Skip code block markers
          return;
        } else if (line.trim() === '---') {
          // Add horizontal line for section breaks
          doc.setDrawColor(220, 220, 220);
          doc.line(20, yPosition - 2, 190, yPosition - 2);
        } else if (line.trim() !== '') {
          doc.text(line, 20, yPosition);
        }
        
        yPosition += 7;
      });
      
      // Add footer with page numbers
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 180, pageHeight - 10);
        doc.text(`© ${new Date().getFullYear()} SkillForge Educational Materials`, 20, pageHeight - 10);
      }
      
      // Save the PDF
      const fileName = `${note.title.replace(/\s+/g, '_')}_Notes.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback: create a simple text file
      const element = document.createElement('a');
      const file = new Blob([note.content], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${note.title.replace(/\s+/g, '_')}_Notes.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleUploadNote = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if file is PDF or text
      if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.pdf') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          
          // Create new note object
          const newNote: Note = {
            id: notes.length + 1,
            title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            subject: 'Uploaded Note',
            uploadedBy: user?.name || 'Unknown User',
            date: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            content: content
          };
          
          // Add to notes array
          setNotes([newNote, ...notes]);
          
          toast({
            title: "Note Uploaded",
            description: "Your note has been successfully uploaded!",
          });
        };
        
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          // For PDF files, we'll just store basic info
          const newNote: Note = {
            id: notes.length + 1,
            title: file.name.replace(/\.[^/.]+$/, ""),
            subject: 'Uploaded PDF',
            uploadedBy: user?.name || 'Unknown User',
            date: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            content: `This is an uploaded PDF file: ${file.name}\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`
          };
          
          setNotes([newNote, ...notes]);
          
          toast({
            title: "PDF Uploaded",
            description: "Your PDF has been successfully uploaded!",
          });
        } else {
          reader.readAsText(file);
        }
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or text file.",
          variant: "destructive",
        });
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Study Notes</h2>
            <p className="text-muted-foreground mt-2">Access learning materials and resources</p>
          </div>
          {(user?.role === 'teacher' || user?.role === 'admin') && (
            <div className="flex gap-2">
              <Button onClick={handleUploadNote}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Notes
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.txt,text/*,application/pdf"
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {note.subject} • Uploaded by {note.uploadedBy}
                      </CardDescription>
                      <CardDescription>
                        {new Date(note.date).toLocaleDateString()} • {note.size}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadNote(note)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}