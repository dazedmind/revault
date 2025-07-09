"use client"
import React, { useEffect, useState } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { useTheme } from 'next-themes'
import DocsCard from '@/app/component/DocsCard'
import noBookmarks from "../../img/bird.png"
import Image from 'next/image'
import LoadingScreen from '@/app/component/LoadingScreen'

function MyBookmarks() {
  const { theme } = useTheme()
  const [bookmarks, setBookmarks] = useState([])
  const [token, setToken] = useState(null)
  const [tokenLoaded, setTokenLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get token from localStorage once component mounts
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setToken(storedToken)
    }
    setTokenLoaded(true)
  }, [])

  useEffect(() => {
    const fetchBookmarks = async () => {
        if (!tokenLoaded) return;

        if (!token) {
          setLoading(false);
          return;
        }
      try {
        const res = await fetch("/api/get-bookmark", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await res.json()

        if (!res.ok) {
          console.error("Failed to fetch bookmarks:", data?.error || res.statusText)
          return
        }

        setBookmarks(
          data.map((paper) => ({
            ...paper,
            title: paper.title.replace(/"/g, ""),
            author: paper.author.replace(/"/g, ""),
            department: paper.department.replace(/"/g, ""),
            year: String(paper.year).replace(/"/g, ""),
            keywords: Array.isArray(paper.keywords)
              ? paper.keywords.flatMap((k) => k.split(",").map((item) => item.trim()))
              : [],
            tags: Array.isArray(paper.tags)
              ? paper.tags.flatMap((t) => t.split(",").map((item) => item.trim()))
              : [],
            abstract: paper.abstract.replace(/"/g, ""),
          }))
        )
      } catch (err) {
        console.error("Error fetching bookmarks:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [token, tokenLoaded])

  if (loading) return <LoadingScreen />

  return (
    <div>
      <AdminNavBar />
      <main className='flex bg-accent min-h-screen'>
        <div className="flex flex-row gap-5 md:mx-24 align-middle">
          <div className="flex flex-col w-full gap-5 my-6 align-middle p-8">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold">My Bookmarks</h1>
            </div>
            {bookmarks.length > 0 ? (
              bookmarks.map((paper, idx) => (
                <DocsCard
                  key={idx}
                  paper_id={paper.paper_id}
                  title={paper.title}
                  author={paper.author}
                  department={paper.department}
                  year={paper.year}
                  description={paper.abstract || "No abstract available"}
                  tags={paper.tags || []}
                  savedFromProfile={true}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center my-15">
                <Image src={noBookmarks} alt="No bookmarks yet" className="w-40 h-40" />
                <p className="text-center text-xl mt-5">No bookmarks yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyBookmarks
