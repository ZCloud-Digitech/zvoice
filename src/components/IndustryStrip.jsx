const INDUSTRIES = [
  {
    label: 'Salons & spas',
    icon: (
      <path d="M6 3l6 9 6-9M9 12l-3 9M15 12l3 9M12 12v9" />
    ),
  },
  {
    label: 'Clinics & dentists',
    icon: (
      <>
        <path d="M12 3v7M8.5 6.5h7" />
        <path d="M7 10v4a5 5 0 0010 0v-4" />
        <circle cx="19" cy="15" r="2" />
      </>
    ),
  },
  {
    label: 'Real estate',
    icon: <path d="M3 11l9-7 9 7M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />,
  },
  {
    label: 'Home services',
    icon: (
      <path d="M14.7 6.3a3 3 0 10-4.2 4.2L4 17v3h3l6.5-6.5a3 3 0 004.2-4.2l-2.2 2.2-2-2 2.2-2.2z" />
    ),
  },
  {
    label: 'Restaurants',
    icon: (
      <>
        <path d="M5 2v8a2 2 0 002 2v10M5 2v20M9 2v8M7 2v8" />
        <path d="M17 2c-1.5 0-3 2-3 6s1.5 6 3 6v8" />
      </>
    ),
  },
  {
    label: 'Agencies',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
      </>
    ),
  },
]

export default function IndustryStrip() {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-ink-soft lg:text-left">
        One AI voice, ready for any business
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-4 lg:justify-start">
        {INDUSTRIES.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-ink-soft">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-brand-500"
            >
              {item.icon}
            </svg>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
