/*
 * Minimal SQL highlighter for the static snippet in a project preview.
 * Not a general-purpose parser — it only colors comments, strings, and a
 * handful of keywords.
 */
const SQL_TOKEN_PATTERN = /(--[^\n]*|'[^']*'|\b(?:CREATE TABLE|PRIMARY KEY|REFERENCES|NOT NULL|DEFAULT)\b)/

const CONSTRAINT_KEYWORDS = new Set(['PRIMARY KEY', 'REFERENCES', 'NOT NULL', 'DEFAULT'])

function tokenClassName(token: string): string | undefined {
  if (token.startsWith('--')) return 'text-code-comment'
  if (token.startsWith("'")) return 'text-code-string'
  if (token === 'CREATE TABLE') return 'text-code-name'
  if (CONSTRAINT_KEYWORDS.has(token)) return 'text-code-keyword'
  return undefined
}

export function HighlightedSql({ code }: { code: string }) {
  // `split` with a capturing group keeps the matched tokens in the result.
  const parts = code.split(SQL_TOKEN_PATTERN)

  return (
    <>
      {parts.map((part, index) => {
        const className = tokenClassName(part)
        return className ? (
          <span key={index} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      })}
    </>
  )
}
