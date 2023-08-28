function FooterSection() {
  return (
    <footer className="bg-gray-800 py-12 text-white">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 text-lg font-bold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-bold">Stay Updated</h4>
            <p className="mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-l-md p-2"
              />
              <button className="rounded-r-md bg-blue-500 p-2 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-6">
          <p>
            &copy; {new Date().getFullYear()} Handinvoice. All rights reserved.
          </p>
          <div>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mx-2 hover:text-gray-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterSection }
