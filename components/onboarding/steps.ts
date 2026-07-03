export const ONBOARDING_STEPS = [
  {
    id: 'background' as const,
    question: "What's your background?",
    subtitle: 'This helps me pitch explanations at the right level.',
    options: [
      { value: 'non_technical', label: 'Non-technical', description: "I don't write code — I lead, plan, or manage." },
      { value: 'some_coding', label: 'Some coding', description: "I can read and write code but haven't shipped a full product." },
      { value: 'developer', label: 'Developer', description: 'I build software professionally or as a serious hobby.' },
    ],
  },
  {
    id: 'role' as const,
    question: "What's your role on this project?",
    subtitle: "I'll tailor exercises to how you'll actually be involved.",
    options: [
      { value: 'building_myself', label: 'Building it myself', description: "I'll write the code and make the technical decisions." },
      { value: 'leading_team', label: 'Leading a team', description: "I'm directing developers and need to understand what they're building." },
      { value: 'learning', label: 'Learning for the future', description: "I'm studying this to prepare for future projects." },
    ],
  },
  {
    id: 'templateId' as const,
    question: 'What kind of product are you building?',
    subtitle: "Pick the closest match — we'll make it specific in the next step.",
    options: [
      { value: 'business_tool', label: 'Internal Business Tool', description: 'CRM, inventory tracker, ops dashboard, team tool.' },
      { value: 'ecommerce', label: 'E-Commerce Store', description: 'Online shop, marketplace, or digital product store.' },
      { value: 'community', label: 'Community Platform', description: 'Forum, membership site, social feed, or content platform.' },
      { value: 'saas', label: 'SaaS Product', description: 'Subscription tool or service you sell to other businesses.' },
      { value: 'custom', label: 'Something else', description: "Describe it in the next step and I'll adapt." },
    ],
  },
] as const
