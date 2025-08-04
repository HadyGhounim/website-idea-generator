'use client'

import { useState } from 'react'
import axios from 'axios'

interface Section {
  id: string
  name: string
  content: string
  order: number
}

interface WebsiteIdea {
  id: string
  idea: string
  sections: Section[]
  createdAt: string
}

export default function Home() {
  const [idea, setIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [websiteIdea, setWebsiteIdea] = useState<WebsiteIdea | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!idea.trim()) {
      setError('Please enter a website idea')
      return
    }

    setIsLoading(true)
    setError('')
    setWebsiteIdea(null)

    try {
      const response = await axios.post('http://localhost:3001/api/website-ideas', {
        idea: idea.trim()
      })

      setWebsiteIdea(response.data.data)
      setIdea('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate website sections. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIdea('')
    setError('')
    setWebsiteIdea(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Idea Generator
          </h1>
          <p className="text-lg text-gray-600">
            Describe your website idea and get AI-generated sections
          </p>
        </div>

        {/* Form */}
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                Website Idea
              </label>
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., Landing page for bakery, E-commerce site for handmade jewelry, Portfolio for photographer..."
                className="input-field h-24 resize-none"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Sections'
                )}
              </button>
              
              {websiteIdea && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Start Over
                </button>
              )}
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="card text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating website sections...</p>
          </div>
        )}

        {/* Preview */}
        {websiteIdea && !isLoading && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Generated Sections
              </h2>
              <p className="text-gray-600">
                Based on: "{websiteIdea.idea}"
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              {websiteIdea.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div key={section.id} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {section.name}
                      </h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        Section {section.order}
                      </span>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              Generated on {new Date(websiteIdea.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 