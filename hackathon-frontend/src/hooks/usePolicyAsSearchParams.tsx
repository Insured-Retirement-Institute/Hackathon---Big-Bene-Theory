import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  useNavigate,
} from "@tanstack/react-router";
import { Policy } from "../PolicyGrid";

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T,
) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (
      value === undefined ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    )
      delete newSearch[key];
  });

  return newSearch;
};

export function usePolicyAsSearchParams<
  T extends RouteIds<RegisteredRouter["routeTree"]>,
>(routeId: T) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const policy: Policy = routeApi.useSearch();
  console.log("policyObject", policy);
  // const policy = policyObject.policy;

  const setPolicy = (updatedPolicy: Partial<typeof policy>) =>
    navigate({
      search: updatedPolicy,
      replace: true,
      // search: (prev) => cleanEmptyParams({ ...prev, ...updatedPolicy }),
    });
  const clearPolicy = () => navigate({ search: {} });

  return { policy, setPolicy, clearPolicy };
}
