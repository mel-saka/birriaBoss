import React from 'react';
import PageWrapper from './PageWrapper';

function Reviews() {
    return (
        <PageWrapper>
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '40px',
            minHeight: '100vh',
            backgroundColor: '#F0F2E4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <style>{`
                .review-iframe {
                    border: none;
                    width: 100%;
                    max-width: 1200px;
                    min-height: 800px;
                    margin: 0 auto;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    border-radius: 16px;
                }

                /* Modern scrollbar styling */
                .review-iframe::-webkit-scrollbar {
                    width: 8px;
                    background: transparent;
                }

                .review-iframe::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 4px;
                }

                .review-iframe::-webkit-scrollbar-thumb {
                    background: #DB0B00;
                    border-radius: 4px;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }

                .review-iframe::-webkit-scrollbar-thumb:hover {
                    background: #FF1A1A;
                }

                /* Firefox scrollbar styling */
                .review-iframe {
                    scrollbar-width: thin;
                    scrollbar-color: #DB0B00 transparent;
                }

                /* Edge/IE scrollbar styling */
                .review-iframe {
                    -ms-overflow-style: auto;
                }

                /* When scrollbar is inactive */
                .review-iframe::-webkit-scrollbar-thumb:vertical {
                    min-height: 30px;
                }
            `}</style>
            <iframe 
                className="review-iframe"
                src="https://5221a677f2bd42f9b892373c56aa70ca.elf.site"
                onLoad={(e) => {
                    if (window.iFrameResize) {
                        window.iFrameResize(e.target);
                    }
                    // Apply styles to iframe content
                    try {
                        const style = document.createElement('style');
                        style.textContent = `
                            ::-webkit-scrollbar {
                                width: 8px;
                                background: transparent;
                            }

                            ::-webkit-scrollbar-track {
                                background: transparent;
                                border-radius: 4px;
                            }

                            ::-webkit-scrollbar-thumb {
                                background: #DB0B00;
                                border-radius: 4px;
                                opacity: 0.7;
                                transition: all 0.3s ease;
                            }

                            ::-webkit-scrollbar-thumb:hover {
                                background: #FF1A1A;
                            }

                            * {
                                scrollbar-width: thin;
                                scrollbar-color: #DB0B00 transparent;
                            }
                        `;
                        e.target.contentDocument.head.appendChild(style);
                    } catch (error) {
                        console.log('Cannot access iframe content');
                    }
                }}
                frameBorder="0"
                title="Brria Boss Reviews"
            />
        </div>
        </PageWrapper>
    );
}

export default Reviews;