import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react'
import logo from '../assets/Logo.png'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 font-montserrat">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <img src={logo} alt="SMEAT Logo" className="h-10 w-auto" />
            <p className="text-gray-500 leading-relaxed">
              Reinventing construction materials for a cleaner, smog-free future. Pakistan's first air-purifying concrete technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-8">Solutions</h4>
            <ul className="space-y-4">
              {['AiroCoat Paint', 'AiroCrete', 'NanoCrete', 'SMEAT Pavers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-8">Get in Touch</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">Address</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Hatch 8, NSTP, NUST H12,<br />Islamabad, Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">Phone</p>
                    <a href="tel:+923035689898" className="text-sm text-gray-500 hover:text-emerald-600">+92 303 5689898</a>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">Email</p>
                    <a href="mailto:info@smeat.pk" className="text-sm text-gray-500 hover:text-emerald-600">info@smeat.pk</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium">
            © 2026 SMEAT. All rights reserved. Reinventing Concrete for a Cleaner Tomorrow.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
