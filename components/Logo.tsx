export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="flex items-center justify-center space-x-2">
    <svg viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2 h-8 w-auto">
      <rect width="10" height="40" rx="4" fill="#2563eb"/>
      <path d="M12 20H18C20.2091 20 22 21.7909 22 24V36C22 38.2091 20.2091 40 18 40H16C13.7909 40 12 38.2091 12 36V20Z" fill="#2563eb"/>
      <path d="M24 24C24 21.7909 25.7909 20 28 20H34V36C34 38.2091 32.2091 40 30 40H28C25.7909 40 24 38.2091 24 36V24Z" fill="#8B5CF6"/>
      <path d="M35 8C37.2091 8 39 9.79086 39 12L39 14C39 16.2091 37.2091 18 35 18L29 18L29 12C29 9.79086 30.7909 8 33 8L35 8Z" fill="#8B5CF6"/>
    </svg>
    <span className="text-md font-regular text-gray-400"><strong className="text-gray-700">Hand</strong>Invoice</span>
    </div>
  )
}
