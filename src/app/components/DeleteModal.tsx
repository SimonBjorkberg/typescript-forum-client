'use client'

import { useRouter } from "next/navigation"
import threadService from "../utils/services/thread.service"

export default function DeleteModal({ deleteWindow, setDeleteWindow, threadId, parentTopic }: any) {

    const router = useRouter()

    const handleClick = async () => {
        const response = await threadService.deleteThread(threadId)
        if (response.data.message) {
            setDeleteWindow(false)
            router.push(`/${parentTopic}`)
        }
    }

    if (deleteWindow) {
        return (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-neutral-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-800 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-neutral-300" id="modal-title">Delete thread</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-neutral-500">Are you sure you want to delete the thread? The thread and its comments will be permanently removed. This action cannot be undone.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-neutral-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleClick} type="button" className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold sm:ml-3 sm:w-auto border rounded-sm hover:text-red-500 transition-all duration-200 border-red-500">Delete</button>
                                <button onClick={() => setDeleteWindow(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-sm px-3 py-2 text-sm font-semibold text-neutral-100 shadow-sm sm:mt-0 sm:w-auto hover:text-neutral-400 border border-neutral-100">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}