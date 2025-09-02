import React from 'react';
import ContactForm from '../components/ContactForm';
import MailIcon from '../components/icons/MailIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import MapPinIcon from '../components/icons/MapPinIcon';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-brand-white text-brand-black">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear about your project. Please fill out the form below or reach out to us directly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
             <h2 className="text-3xl font-semibold border-b pb-4">Contact Information</h2>
             
             <div className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 mt-1 text-gray-700 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Our Studio</h3>
                    <p className="text-gray-600">123 Architecture Lane, Metropolis, 10101</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <MailIcon className="w-6 h-6 mt-1 text-gray-700 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <a href="mailto:contact@architectstudio.com" className="text-gray-600 hover:text-black transition-colors">contact@architectstudio.com</a>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <PhoneIcon className="w-6 h-6 mt-1 text-gray-700 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-black transition-colors">(555) 123-4567</a>
                </div>
             </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-8 border-b pb-4">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
      
      <section className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.608332128775!2d-73.98784418459418!3d40.74881797932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1678886976211!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map of our location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
