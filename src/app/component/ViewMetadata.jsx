"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from 'react-icons/fa6';

function ViewMetadata({onClick}) {
  return (
    <div>
            <div className="absolute top-0 left-0 bg-dusk w-full h-[calc(100vh-5rem)] z-50 p-10 shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto transform ${showMetadata ? 'translate-x-0' : '-translate-x-full'">
            <span className='flex items-center text-center align-middle gap-2 justify-between mb-6'>
                <h2 className="text-3xl font-bold"> Viewing Document Metadata</h2>
                <button className="text-2xl px-4 rounded-md cursor-pointer" onClick={onClick}>
                <FaChevronLeft />
                </button>
            </span>

            <div className='border-2 border-white-5 p-8 rounded-md'>
                <p className='font-bold text-2xl'>Abstract.md</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet. </p> <br></br>
                
                <p className='font-bold text-2xl'>Results</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet. </p> <br></br>

                <p><strong>Title:</strong> {papers.title}</p>
                <p><strong>Authors:</strong> {papers.author}</p>
                <p><strong>Date:</strong> {papers.year}</p>
                <p><strong>Tags:</strong> {papers.tags}</p>
                <p><strong>Keywords:</strong> {papers.keywords}</p>
            </div>
        </div>
    </div>
  )
}

export default ViewMetadata