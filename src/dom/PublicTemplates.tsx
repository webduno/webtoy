'use client'

import { Tooltip } from "react-tooltip"
import { useEffect, useState } from "react"
import Logo from "@/dom/atom/logo/Logo"
import { AIShowcaseResult } from "./molecule/AIShowcaseResult"
import { useCopyToClipboard } from "usehooks-ts"
import { GameButton } from "./atom/game/GameButton"

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
  const [clipboardValue, clipboard__do] = useCopyToClipboard()
  const [didCopy, setDidCopy] = useState<number>(0)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchTemplates = async (currentOffset: number = 0) => {
    try {
      const response = await fetch(`/api/getPublicTemplates?limit=8&offset=${currentOffset}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      const data = await response.json()
      
      if (data.success) {
        // Parse the content of each template
        const parsedTemplates = data.data.map((template: Template) => ({
          ...template,
          content: typeof template.content === 'string' ? JSON.parse(template.content) : template.content
        }))
        
        if (currentOffset === 0) {
          setTemplates(parsedTemplates)
        } else {
          setTemplates(prev => [...prev, ...parsedTemplates])
        }
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const handleLoadMore = () => {
    setLoadingMore(true)
    const newOffset = offset + 8
    setOffset(newOffset)
    fetchTemplates(newOffset)
  }

  return (<>
  
  {selectedTemplate && (<>
<div className="flex-col flex-align-center pos-abs z-1000 block w-100 h-100 bg-glass-10">
  
            <div className="my-4 bord-r-10 pa-2 h-400px w-300px flex-col gap-3"
            style={{
              // boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
  boxShadow: "inset 0 -1px 2px #844703, 0 0 0 2px #F8B507, 0 0 0 3px #B47733",
              
              background: "linear-gradient(135deg, #F5D67B, #D4A35E)",
            }}
            >
            <div className="flex-row gap-2 mb-">
                          <GameButton 
                            buttonType="alpha" 
                            classOverride="tx-lg"
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(selectedTemplate.content));
                              setDidCopy((prev) => prev + 1)
                            }}
                          >
                            {didCopy ? `Copied to clipboard! ${didCopy == 0 ? '' : `x${didCopy}`}` : 'Copy to clipboard'}
                          </GameButton>
                          </div>
              <div  className="pa-4 bord-r-10 pos-rel"
              style={{

                background: "linear-gradient(0deg, #B67B3B, #C78B4B)",
                boxShadow: "inset 0 -5px 10px #653D2D, 0 0 5px #653D2D",
              }}
              >
                <div  className="ma-2 pos-abs top-0 right-0  pa-1 bord-r-100 box-shadow-5-b" style={{background:"lightgrey"}}></div>
                <div  className="ma-2 pos-abs top-0 left-0  pa-1 bord-r-100 box-shadow-5-b" style={{background:"lightgrey"}}></div>
                <div  className="ma-2 pos-abs bottom-0 right-0  pa-1 bord-r-100 box-shadow-5-b" style={{background:"lightgrey"}}></div>
                <div  className="ma-2 pos-abs bottom-0 left-0  pa-1 bord-r-100 box-shadow-5-b" style={{background:"lightgrey"}}></div>
                <AIShowcaseResult result={selectedTemplate.content} />
                </div>

<div className="tx-sm pa-2 opaci-75 flex-col flex-align-start">
  <div>Artwork Name:</div>
  <div className="pb-2 tx-altfont-4"> {selectedTemplate.name}</div>
  Description: {selectedTemplate.description}
  <div className="flex-row gap-2 flex-justify-start">
    <div>Author: {selectedTemplate.created_by}</div>
    {/* show date in format 2025-04-02 00:00 */}
  </div>
    <div className="tx-sm opaci-75">
      ({new Date(selectedTemplate.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })})
    </div>

</div>

            </div>
            <div className="flex-row gap-2">
              <GameButton 
                buttonType="zeta" 
                classOverride="tx-md"
                onClick={() => {
                  setSelectedTemplate(null);
                  setDidCopy(0);
                }}
              >
                Go Back to List
              </GameButton>
            </div>
          </div>
      </>)}

    <div className="flex-col h-100 w-100 pos-abs top-0 pt-8 flex-justify-start " >



          
      <div className="tx-ls-3 pb-4 tx-altfont-4 game-font-1 tx-lx tx-center">Public <br /> Community<br />Maps</div>

      <div className="w-100  text-center p-4 tx-white bord-r-5 w-max-1080px h-min-300px flex-justify-start flex-col flex-align-center" style={{
        boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
        background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
      }}>
          <div className="flex-wrap flex-justify-center w-100 autoverflow-y gap- 3 h-min-300px   flex-align-center"
          style={{
            maxHeight: '70vh',
          }}
          >
            {loading ? (
              <div className="tx-white w-100 pa-8 tx-center">Loading templates...</div>
            ) : templates.length === 0 ? (
              <div className="tx-white w-100 pa-8 tx-center">No templates available</div>
            ) : (
              <>
                {templates.map((template) => (
                  <button 
                    key={template.id}
                    className='ma-2 game-list-item block bord-r-10 pointer w-220px h- 400px'
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div data-tooltip-id={`${template.id}-public-template-tooltip`}
                      className='tx-md opaci- pa-2 pb-3 tx-lg block nodeco  tx-white flex-col'>
                      <div className='tx-start tx-altfont-4 w-100 tx-md pb-1 mb-1'>{template.description}</div>
                      <div className="flex-row flex-justify-between flex-align-end w-100">
                        <div className='tx-altfont-4 bg-white tx-smd bord-r-100 px-2 py-1 opaci-75'>
                          <div>👤 {template.created_by}</div>
                        </div>
                        <div className='tx-sm opaci-75'>
                          {new Date(template.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                {hasMore && (
                  <div className="w-100 flex-justify-center pa-4">
                    <GameButton 
                      buttonType="alpha" 
                      classOverride="tx-md"
                      onClick={handleLoadMore}
                    >
                      {loadingMore ? 'Loading...' : 'Load More'}
                    </GameButton>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </div>
  </>
  )
} 