export function downloadPDF(filename = "resume.pdf") {
  // Use browser's print functionality to generate PDF
  // This is the most reliable cross-browser solution
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    throw new Error("Please allow popups to download PDF")
  }

  // Clone the current document
  const content = document.documentElement.cloneNode(true) as HTMLElement

  // Remove the floating action buttons
  const floatingButtons = content.querySelector(".fixed.top-4.right-4")
  if (floatingButtons) {
    floatingButtons.remove()
  }

  // Write to the new window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          ${Array.from(document.styleSheets)
            .map((sheet) => {
              try {
                return Array.from(sheet.cssRules)
                  .map((rule) => rule.cssText)
                  .join("\n")
              } catch (e) {
                return ""
              }
            })
            .join("\n")}
          
          @media print {
            body { margin: 0; padding: 20px; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        ${content.querySelector("body")?.innerHTML || ""}
      </body>
    </html>
  `)

  printWindow.document.close()

  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
}
