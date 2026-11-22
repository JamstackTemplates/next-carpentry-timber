import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { EndGrainRound } from './art/end-grain-round';
import { MenuIcon } from './art/icons';
import { SiteLink } from './site-link';

const MENU_ID = 'site-menu';

const NAV_LINKS = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/timbers/', label: 'Timbers' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap flex min-h-20 items-center justify-between gap-2 py-2 sm:gap-3">
        <SiteLink
          href="/"
          className="group flex min-w-0 items-center gap-2 text-ink no-underline hover:no-underline sm:gap-3"
        >
          <EndGrainRound
            seed="heartwood-logo"
            rings={8}
            size={40}
            swatch={{ base: '#E4C592', grain: '#9E6E38', heart: '#653C1D' }}
            className="size-9 shrink-0 sm:size-11"
          />
          <span className="grid min-w-0 leading-none">
            <span className="font-display text-[0.95rem] font-bold leading-tight tracking-tight sm:text-xl">
              {business.name}
            </span>
            <span className="font-pencil text-base leading-none text-muted sm:text-lg">
              {business.subtitle}
            </span>
          </span>
        </SiteLink>

        <nav aria-label="Main" className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            className="nav-menu-button min-h-10 items-center gap-1 rounded-ui border border-line bg-paper px-2.5 font-display text-sm font-semibold text-ink hover:bg-band sm:px-3"
            popoverTarget={MENU_ID}
            popoverTargetAction="toggle"
            aria-controls={MENU_ID}
          >
            <MenuIcon className="size-4 shrink-0" />
            <span>Menu</span>
          </button>

          <ul
            id={MENU_ID}
            className="site-menu-popover m-0 list-none"
            popover="auto"
          >
            {NAV_LINKS.map(item => (
              <li key={item.href}>
                <SiteLink href={item.href} markCurrent="page" closePopover={MENU_ID} className="nav-link w-full">
                  {item.label}
                </SiteLink>
              </li>
            ))}
            <li className="flex items-center pt-1 md:pt-0 md:pl-1">
              <DarkModeToggle />
            </li>
          </ul>

          <SiteLink href="/contact/" markCurrent="page" className="button min-h-10 px-3 py-2 text-sm sm:px-4 sm:text-base">
            Contact
          </SiteLink>
        </nav>
      </div>
    </header>
  );
}
