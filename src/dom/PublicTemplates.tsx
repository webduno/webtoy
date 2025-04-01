'use client'

import { Tooltip } from "react-tooltip"
import { useEffect, useState } from "react"
import Logo from "@/dom/atom/logo/Logo"
import { AIShowcaseResult } from "./molecule/AIShowcaseResult"

interface Template {
  id: string;
  name: string;
  description: string;
  content: any;
  created_at: string;
  created_by: string;
}

export default function PublicTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/getPublicTemplates')
        const data = await response.json()
        
        if (data.success) {
          // Parse the content of each template
          const parsedTemplates = data.data.map((template: Template) => ({
            ...template,
            content: typeof template.content === 'string' ? JSON.parse(template.content) : template.content
          }))
          setTemplates(parsedTemplates)
        }
      } catch (error) {
        console.error('Error fetching templates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return (<>
  
  {selectedTemplate && (<>
<div className="flex-col flex-align-center pos-abs z-1000 block w-100 h-100 bg-glass-10">
            <div className="my-4 bord-r-10 pa-2 h-300px w-300px flex-col"
            style={{
              boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
              background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
            }}
            >
              <AIShowcaseResult result={selectedTemplate.content} />
            </div>
          </div>
      </>)}

    <div className="flex-col h-100 w-100 pos-abs top-0 pt-8 flex-justify-start " >



          
      <div className="tx-ls-3 pb-4 tx-altfont-4 game-font-1 tx-lx tx-center">PUBLIC<br />TEMPLATES</div>

      <div className="w-100  text-center p-4 tx-white bord-r-5 w-max-1080px h-min-300px flex-justify-start flex-col flex-align-center" style={{
        boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
        background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
      }}>
          <div className="flex-wrap flex-justify-start gap-3 w-100 autoverflow-y gap-3 h-min-300px  flex-align-start">
            {loading ? (
              <div className="tx-white w-100 pa-8 tx-center">Loading templates...</div>
            ) : templates.length === 0 ? (
              <div className="tx-white w-100 pa-8 tx-center">No templates available</div>
            ) : (
              templates.map((template) => (
                <button 
                  key={template.id}
                  className='ma-2 game-list-item block bord-r-10 pointer w-250px'
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div data-tooltip-id={`${template.id}-public-template-tooltip`}
                    className='tx-md opaci- pa-2 pb-3 tx-lg block nodeco  tx-white flex-col'>
                    <div className='tx-start tx-altfont-4 w-100 tx-md pb-1 mb-1'>{template.description}</div>
                    <div className="flex-row flex-justify-between flex-align-end w-100">
                      <div className='tx-altfont-4 bg-white tx-smd bord-r-100 px-2 py-1 opaci-75'>
                        <div>👤 {template.created_by}</div>
                      </div>
                      <div className='tx-sm opaci-75'> {new Date(template.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
      </div>
    </div>
  </>
  )
} 