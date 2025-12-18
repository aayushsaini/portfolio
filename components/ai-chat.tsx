import React, { useState, useRef, useEffect } from 'react'
import { sendMessageToGemini } from '../services/gemini-service'
import { ChatMessage } from '../types'
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Hi, I\'m Aayush\'s AI Assistant. Ask me about his experience at BCG, his Azure certifications, or his work in Agentic AI.' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userText = inputValue.trim()
    setInputValue('')

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    }

    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      // Convert current messages to history format for the API
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }))

      const responseText = await sendMessageToGemini(history, userText)

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Something went wrong. Please try again.",
        isError: true
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom-right transform w-[350px] md:w-[400px] h-[500px] glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4",
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Aayush AI</h3>
              <p className="text-xs text-zinc-400">Powered by Gemini 2.5</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-white/5'
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                <span className="text-xs text-zinc-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Aayush's experience..."
              className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-full text-white transition-all shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "pointer-events-auto w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black'
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}