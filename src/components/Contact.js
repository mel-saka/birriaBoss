import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';

function Contact() {
    return (
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
                .contact-container {
                    text-align: center;
                    padding: 60px;
                    background: white;
                    border-radius: 30px;
                    box-shadow: 0 20px 40px rgba(219, 11, 0, 0.1);
                    max-width: 700px;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .contact-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 6px;
                    background: linear-gradient(90deg, #DB0B00, #FFB4E1);
                }

                .contact-title {
                    color: #DB0B00;
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    font-weight: bold;
                    font-family: 'Bukhari Script', sans-serif;
                }

                .contact-subtitle {
                    color: #666;
                    font-size: 1.1rem;
                    margin-bottom: 3rem;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                }

                .contact-links {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .contact-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    padding: 1.2rem 2rem;
                    background: white;
                    color: #DB0B00;
                    text-decoration: none;
                    border-radius: 15px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: 2px solid #DB0B00;
                    position: relative;
                    overflow: hidden;
                }

                .contact-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #DB0B00, #FFB4E1);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 1;
                }

                .contact-link:hover::before {
                    opacity: 1;
                }

                .contact-link span,
                .contact-link svg {
                    position: relative;
                    z-index: 2;
                    transition: all 0.3s ease;
                }

                .contact-link:hover span,
                .contact-link:hover svg {
                    color: white;
                }

                .contact-link svg {
                    width: 24px;
                    height: 24px;
                    color: #DB0B00;
                }

                .contact-decoration {
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, #DB0B00, #FFB4E1);
                    opacity: 0.1;
                    border-radius: 50%;
                    z-index: 0;
                }

                .decoration-1 {
                    top: -100px;
                    right: -100px;
                }

                .decoration-2 {
                    bottom: -100px;
                    left: -100px;
                }

                @media (max-width: 768px) {
                    .contact-container {
                        padding: 40px 20px;
                        margin: 20px;
                    }

                    .contact-title {
                        font-size: 2.5rem;
                    }

                    .contact-subtitle {
                        font-size: 1rem;
                        padding: 0 20px;
                    }

                    .contact-link {
                        padding: 1rem 1.5rem;
                        font-size: 1.1rem;
                    }
                }
            `}</style>

            <div className="contact-container">
                <div className="contact-decoration decoration-1"></div>
                <div className="contact-decoration decoration-2"></div>
                
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">
                    Connect with us on Instagram for updates and special offerings, 
                    or reach out via email for catering inquiries and feedback.
                </p>
                
                <div className="contact-links">
                    <a 
                        href="https://www.instagram.com/birriaboss.nz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        <MessageSquare />
                        <span>Follow us on Instagram</span>
                    </a>
                    <a 
                        href="mailto:contact@birriaboss.co.nz"
                        className="contact-link"
                    >
                        <Mail />
                        <span>Email Us</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;