import {
  Mail,
  Phone,
  Smartphone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <NavMenu />
      <div className="min-h-screen  px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
            <p className="text-gray-500 text-sm">
              We'd love to hear from you. Here's how you can reach us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <span>
                  <strong>Email:</strong> info@shopora.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>
                  <strong>Telephone:</strong> +1 (800) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-teal-600" />
                <span>
                  <strong>Mobile:</strong> +1 (555) 987-6543
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>
                  <strong>Fax:</strong> +1 (800) 555-1212
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600" />
                <span>
                  <strong>Address:</strong> 123 Shopora Street,
                  <br />
                  Suite 456, New York, NY 10001
                </span>
              </div>
            </div>

            <div className="space-y-6 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600" />
                <div>
                  <strong>Opening Hours:</strong>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
                    <li>Saturday: 10:00 AM – 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>

              <div>
                <strong>Follow Us:</strong>
                <div className="flex gap-4 mt-2 text-teal-600">
                  <a href="#" aria-label="Facebook">
                    <Facebook className="w-5 h-5 hover:text-blue-600" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="w-5 h-5 hover:text-blue-400" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Instagram className="w-5 h-5 hover:text-pink-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-64 rounded-lg overflow-hidden border">
            <iframe
              title="Shopora Location"
              src="https://maps.google.com/maps?q=New York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
