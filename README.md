```
React Frontend ➝ Express API (/generate-doc)
    └── Express fetches case info (from DB or frontend)
    └── Prepares prompt
    └── Calls Python Server POST /generate
           └── Python generates and returns document text
    └── Express returns final content to frontend

```
