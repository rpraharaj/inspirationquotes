# Prompt #29: Generate Unit Tests

**Category:** Testing & QA
**Best AI Tool:** Claude 4 Sonnet (generates thorough test cases)  
**Difficulty:** Intermediate
**Use Case:** New function testing  

---

## 📋 Prompt Template

```
You are a TDD expert specializing in [language] and [testing framework].

FUNCTION TO TEST:
[Paste function including any dependencies it calls]

TESTING REQUIREMENTS:
- Framework: [Jest / pytest / JUnit / Mocha / etc.]
- Coverage target: 100% (all branches)
- Structure: AAA Pattern (Arrange-Act-Assert)
- Naming: "should [behavior] when [condition]"

DEPENDENCIES TO MOCK:
- External APIs: [list any API calls]
- Database: [list DB operations]
- File system: [list file operations]
- Date/Time: [if function uses current time]

TEST CATEGORIES:

1. HAPPY PATH (2-3 tests)
   - Valid inputs with expected outputs
   - Most common use case

2. EDGE CASES (4-6 tests)
   - Empty: "", [], {}, null, undefined
   - Boundaries: 0, -1, MAX_INT, very long strings
   - Special characters: Unicode, newlines

3. ERROR CONDITIONS (3-4 tests)
   - Invalid input types
   - Out-of-range values
   - Network/DB failures (if applicable)

OUTPUT FORMAT:

## Test Suite: [FunctionName]Tests

### Test Data Setup
[Shared test fixtures]

### Happy Path Tests
[2-3 tests with AAA pattern]

### Edge Case Tests  
[4-6 tests covering boundaries]

### Error Condition Tests
[3-4 tests for failure modes]

## Coverage Expected
Statements: 100% | Branches: 100% | Functions: 100% | Lines: 100%

## Example Test (AAA Pattern):
it('should return sum when given valid numbers', () => {
  // Arrange
  const a = 5, b = 3;
  const expected = 8;
  
  // Act
  const result = add(a, b);
  
  // Assert
  expect(result).toBe(expected);
});
```

---

## ✅ When to Use This Prompt

- ✅ New function testing  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** AAA pattern makes tests readable - Arrange setup, Act execute, Assert verify
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
