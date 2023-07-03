import { useEffect, $ } from 'voby';
import type { IFiles } from "codesandbox-import-utils/lib/api/define";
import type { ThemeMode } from "components/Theme";
import { getSandboxByQuery } from "utils/getSandbox";

interface SandboxQuery {
  js: boolean;
  pkg: string;
  name: string;
  theme: ThemeMode;
  pathname: string;
}
interface ReturnValue {
  sandbox: IFiles | null;
  loading: boolean;
}

export default function useSandbox(
  defaultSandbox: IFiles | null,
  { js, pkg, name, theme, pathname }: SandboxQuery
): ReturnValue {
  const sandbox = $(defaultSandbox);
  const isLoading = $(false);
  const prevJs = $(js);
  const loading = isLoading() || prevJs() !== jsffect(() => {
    if (prevJs(js)) {
      return;
    }

    prevJs(js);
    if (!pkg || !name || !pathname.startsWith("/sandbox")) {
      sandbox(null);
      isLoading(false);
      return;
    }

    let cancelled = false;
    isLoading(true);
    async function load(): Promise<void> {
      const sandbox = await getSandboxByQuery({ js, pkg, name, theme });
      if (!cancelled) {
        isLoading(false);
        sandbox(sandbox());
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  });

  return { sandbox(), loading };
}
