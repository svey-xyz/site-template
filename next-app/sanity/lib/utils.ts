import { config as RootConfig } from "@sanity.next-app/lib/api";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";

type DataAttributeConfig = CreateDataAttributeProps &
	Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
	return createDataAttribute({
		projectId: RootConfig.projectId,
		dataset: RootConfig.dataset,
		baseUrl: RootConfig.baseUrl
	}).combine(config);
}
