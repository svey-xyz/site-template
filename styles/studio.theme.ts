import { buildLegacyTheme } from "sanity";

const props = {
	"--custom-white": "#FFF",
	"--custom-black": "#1A1A1A",
	"--custom-grey": "#666",
	"--primary-accent": "#64aca4",
	"--custom-red": "#C43F21",
	"--custom-yellow": "#C5A922",
	"--custom-green": "#22C55E",
}

export const studioTheme = buildLegacyTheme({
	// /* Base colours */
	// "--white": props["--custom-white"],
	// "--black": props["--custom-black"],

	// "--gray": props["--custom-grey"],
	// "--gray-base": props["--custom-grey"],

	// "--component-bg": props["--custom-black"],
	// "--component-text-color": props["--custom-white"],

	// /* Brand */
	// "--brand-primary": props["--primary-accent"],

	// /* Default button */
	// "--default-button-color": props["--custom-grey"],
	// "--default-button-primary-color": props["--primary-accent"],
	// "--default-button-success-color": props["--custom-green"],
	// "--default-button-warning-color": props["--custom-yellow"],
	// "--default-button-danger-color": props["--custom-red"],

	// /* State */
	// "--state-info-color": props["--primary-accent"],
	// "--state-success-color": props["--custom-green"],
	// "--state-warning-color": props["--custom-yellow"],
	// "--state-danger-color": props["--custom-red"],

	// /* Navbar */
	// "--main-navigation-color": props["--custom-black"],
	// "--main-navigation-color--inverted": props["--custom-white"],

	// "--focus-color": props["--primary-accent"],

})