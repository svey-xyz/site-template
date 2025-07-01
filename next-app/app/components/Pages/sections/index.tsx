import { Page } from "@next-app/sanity.types"

type Section = Page['sections']

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
	? ElementType
	: never;

export const Section = ({ data }: { data: ArrElement<Section> }) => {

	return (
		<section id={data.title}>
		</section>
	)
}

export default Section