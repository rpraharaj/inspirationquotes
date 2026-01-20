# Prompt #47: Refactor Legacy Code

**Category:** Refactoring & Optimization
**Best AI Tool:** Claude 4 Opus  
**Difficulty:** Intermediate
**Use Case:** Modernizing old code  

---

## 📋 Prompt Template

```
Act as a modernization specialist.

CONTEXT:
- Legacy Code: [paste block]
- Target Version: [e.g., Python 3.12 / Java 21]
- Goal: [Maintainability / Performance]

TASK - Modernize the block:

Step 1: DEBT AUDIT
List deprecated functions and inefficient patterns.

Step 2: MODERN REWRITE
Rewrite using safe, modern idioms.

OUTPUT FORMAT:

## Modernized Code
[Clean code block]

## Changes Made
- [Feature A] -> [Modern Feature B] (Why: Security/Speed)

## Performance Impact
- [Memory/CPU change estimation]
$('#submitBtn').click(function() {
  $.ajax({
    url: '/api/users',
    success: function(data) {
      $('#userList').html(data.map(u => '<li>' + u.name + '</li>').join(''));
    }
  });
});
const UserList = () => {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };
  
  return (
    <>
      <button onClick={fetchUsers}>Submit</button>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </>
  );
};
```

---

## ✅ When to Use This Prompt

- ✅ Modernizing old code  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.

- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
