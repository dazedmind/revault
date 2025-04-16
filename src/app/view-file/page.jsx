"use client"
import React, { useState } from 'react';
import NavBar from '../component/NavBar'
import Image from 'next/image'
import document from "../img/document.png";
import avatar from "../img/user.png";
import { FaBookmark, FaFlag, FaLink, FaMoon, FaCircleInfo, FaChevronLeft } from 'react-icons/fa6';
import FileMenuButton from '../component/FileMenuButton';
import ViewMetadata from '../component/ViewMetadata';

function ViewFile() {
    const [showMetadata, setShowMetadata] = useState(false);

  return (
    <div className='bg-midnight h-auto'>
        <NavBar/>
        
        <main className='flex gap-6 h-auto justify-center'>
            <div className='flex gap-6 relative'>
                {showMetadata && (
                    <div className="absolute top-0 left-0 bg-dusk w-full h-screen z-50 p-10 shadow-lg duration-300 ease-in-out overflow-y-auto ">
                        <span className='flex items-center text-center align-middle gap-2 justify-between mb-6'>
                            <h2 className="text-3xl font-bold"> Viewing Document Metadata</h2>
                            <button className="text-2xl px-4 rounded-md cursor-pointer" onClick={() => setShowMetadata(false)}>
                            <FaChevronLeft />
                            </button>
                        </span>

                        <div className='border-2 border-white-5 p-8 rounded-md'>
                            <p className='font-bold text-2xl'>Abstract.md</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet. </p> <br></br>
                            
                            <p className='font-bold text-2xl'>Results</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet. </p> <br></br>

                            <p><strong>Title:</strong> ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</p>
                            <p><strong>Authors:</strong> John Allen Troy Valena, etc.</p>
                            <p><strong>Date:</strong> April 6, 2025</p>
                            <p><strong>Tags:</strong> IT, SIA, Cloud</p>
                            <p><strong>Keywords:</strong> SEO, Repository</p>
                        </div>
                    </div>
                )}
                <aside className='flex flex-col w-72 h-auto bg-darker p-8'>

                    <h1 className='text-2xl font-bold'>File Menu</h1>

                    <FileMenuButton icon={<FaCircleInfo className='text-xl text-white-50' />} label="View Metadata" onClick={() => setShowMetadata(!showMetadata)} />
                
                    {/* divider */}
                    <div className="bg-dusk h-0.5 w-auto my-4"></div>

                    <FileMenuButton icon={<FaMoon className='text-xl text-white-50' />} label="Toggle Dark Mode" />
                    <FileMenuButton icon={<FaBookmark className='text-xl text-white-50' />} label="Add to Bookmark" />
                </aside>

                <div className='Document '>
                    {/* <Image src={document} className='h-auto w-fit' alt='document'/> */}
                    {/* <PdfViewer pdfUrl="https://poropointfreeport.gov.ph/wp-content/uploads/2023/02/PPFZ-Request-for-Inspection-Form.pdf" /> */}

                    <object data="/sample.pdf" type="application/pdf" width="100%" height="100%" className='h-screen w-3xl'> 
                        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                    </object>                 
                </div>
            </div>
      

            <div className='p-6 w-1/3 relative'>
                <p className='text-2xl font-bold'>ReVault: A Version-Controlled Cloud Repository with SEO Metadata Tagging for Archiving Thesis Works of PLM CISTM Students</p>

                <div className='flex flex-row gap-3 items-center my-4 flex-wrap'> 
                    <div className='flex flex-row gap-2 items-center'>
                        <Image src={avatar} className='w-8 rounded-full' alt='author'/>
                        <p>John Allen Troy Valena</p>
                    </div>
             
                    <div className='flex flex-row gap-2 items-center'>
                        <Image src={avatar} className='w-8 rounded-full' alt='author'/>
                        <p>Matthew Jacob Insigne</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <Image src={avatar} className='w-8 rounded-full' alt='author'/>
                        <p>Jetthro Karl Yacub</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <Image src={avatar} className='w-8 rounded-full' alt='author'/>
                        <p>Kristhia Lastra</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <Image src={avatar} className='w-8 rounded-full' alt='author'/>
                        <p>KC Durante</p>
                    </div>
                </div>


                <p>April 6, 2025</p>
                
                <span className='flex gap-2 flex-wrap overflow-hidden my-2'>    
                    <p className='bg-dusk p-2 rounded-md w-auto text-sm px-3'>IT</p>
                    <p className='bg-dusk p-2 rounded-md w-auto text-sm px-3'>SIA</p>
                </span>



                <p>Keywords: Cloud Repository, SEO</p>
                
                <div className='bg-dusk border-2 border-white-5 p-6 rounded-md mt-4'>
                    <h1 className='text-xl font-bold'>Abstract.md </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ex imperdiet, tristique erat non, luctus justo. In at facilisis metus. Donec volutpat nisi magna, sit amet dignissim neque imperdiet sit amet. </p>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ViewFile