import type { ReactElement } from 'voby';
import { useEffect, $ } from 'voby';
import Head from "next/head";
import type { IFiles } from "codesandbox-import-utils/lib/api/define";
import { Dialog } from "@react-md/dialog";
import type { TreeData } from "@react-md/tree";
import { useAppSize } from "@react-md/utils";

import { toTitle } from "utils/toTitle";

import CodePreview from "./CodePreview";
import SandboxFileTree from "./SandboxFileTree";
import SandboxNavigation from "./SandboxNavigation";
import type { FileTreeData } from "./useFiles";

import styles from "./SandboxModal.module.scss";

interface SandboxModalProps {
  pkg: string;
  name: string;
  from: string;
  loading: boolean;
  fileName: string;
  folders: readonly string[];
  sandbox: IFiles | null;
  files: TreeData<FileTreeData>;
  onFileChange: (fileName: string) => void;
  onRequestClose: () => void;
}

export default function SandboxModal({
  pkg,
  name,
  from,
  fileName,
  sandbox,
  files,
  folders,
  loading,
  onFileChange,
  onRequestClose,
}: SandboxModalProps): Child {
  const pkgName = toTitle(pkg, " ", true);
  const title = `react-md - ${pkgName} - ${name} Sandbox`;

  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSize();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const isTreeVisible = $(isDesktop);
  const showOrToggleTree = (() => {
    if (isPhone) {
      isTreeVisible(true);
      return;
    }

    isTreeVisible((prevVisible) => !prevVisible);
  });
  const hideTree = (() => isTreeVisible(false));

  useEffect(() => {
    isTreeVisible((prevVisible) => {
      if (isDesktop) {
        return true;
      }

      if (prevVisible && isTablet && isLandscape) {
        return true;
      }

      return false;
    });
  });

  return (
    <Dialog
      id="sandbox-modal"
      aria-labelledby="sandbox-modal-title"
      portal={false}
      modal
      type="full-page"
      visible={sandbox !== null}
      onRequestClose={onRequestClose}
      className={styles.dialog}
      disableTransition
    >
      <Head>
        <title>{title}</title>
      </Head>
      <SandboxNavigation
        name={`${pkgName} ${name}`}
        fileName={fileName}
        from={from}
        onRequestFiles={showOrToggleTree}
        onRequestClose={onRequestClose}
      />
      <SandboxFileTree
        from={from}
        files={files}
        folders={folders}
        fileName={fileName}
        inline={inline}
        visible={isTreeVisible}
        hideTree={hideTree}
        onFileChange={onFileChange}
        onRequestClose={onRequestClose}
        disableTransition={inline && isDesktop}
      />
      <CodePreview
        loading={loading}
        fileName={fileName}
        sandbox={sandbox}
        offset={inline && isTreeVisible}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
}
