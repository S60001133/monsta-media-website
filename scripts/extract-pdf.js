// Simple PDF to Markdown extractor using pdf-parse
// Reads src/pages/MM_Proposal [Nov 24] (5).pdf and writes content/pdf_extracted.md

import fs from 'fs'
import path from 'path'
import pdf from 'pdf-parse'

const pdfPath = path.resolve('src/pages/MM_Proposal [Nov 24] (5).pdf')
const outDir = path.resolve('content')
const outFile = path.join(outDir, 'pdf_extracted.md')

async function run() {
  try {
    if (!fs.existsSync(pdfPath)) {
      console.error(`PDF not found at: ${pdfPath}`)
      process.exit(1)
    }

    const dataBuffer = fs.readFileSync(pdfPath)
    const data = await pdf(dataBuffer)

    const text = (data.text || '').trim()
    if (!text) {
      console.error('No text extracted from PDF.')
      process.exit(1)
    }

    // Basic formatting: split by double newlines into sections
    const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean)

    const header = `---\nsource: ${path.basename(pdfPath)}\nextractedAt: ${new Date().toISOString()}\n---\n\n`
    const body = lines.map(l => {
      // Promote likely headings (short lines) to markdown headers
      if (l.length <= 60 && /^[A-Z][A-Za-z0-9 ,&()'\-]+$/.test(l)) {
        return `## ${l}`
      }
      return l
    }).join('\n\n')

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    fs.writeFileSync(outFile, header + body, 'utf-8')
    console.log(`Extracted content written to: ${outFile}`)
  } catch (err) {
    console.error('Failed to extract PDF:', err)
    process.exit(1)
  }
}

run()
