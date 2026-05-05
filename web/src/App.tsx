import { Navigate, Route, Routes } from 'react-router-dom'
import { HelloWorldPage } from '@/pages/HelloWorldPage.generated'
import { utilityClassExamples } from '@/lib/theme'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <main className={`${utilityClassExamples.appShell} mx-auto max-w-4xl`}>
        <Routes>
          <Route path="/" element={<HelloWorldPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
