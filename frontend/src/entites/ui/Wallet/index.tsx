import { useEffect } from "react";

import { useRecoilValue } from "recoil";

import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

import { shortenAddress } from "shared/utils";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { useDropdown } from "shared/hooks/useDropdown";
import { CloseIcon, CopyIcon, ProfileIcon, ViewIcon } from "shared/UI/Icons";
import { UserIcon } from "shared/UI/Icons/UserIcon";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";

interface IProps {
  chainId: number | null;
  className?: string;
  setOpenWallet: (el: boolean) => void;
  setChainId: (el: number | null) => void;
}

export function Wallet({
  className,
  setOpenWallet,
  setChainId,
  chainId,
}: IProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const theme = useRecoilValue(themeState);

  const { close, dropdownRef, isOpen, open } = useDropdown();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    chainId !== null && switchNetwork?.(chainId);
  }, [chainId]);

  return (
    <div ref={dropdownRef} className={cn("w-fit z-[100000]", className)}>
      {isMobile ? (
        <UserIcon onClick={open} />
      ) : (
        <button
          disabled={isOpen}
          onClick={open}
          className={cn(
            "text-[24px] text-[#040026] leading-[100%]",
            "hidden sm:block duration-500 py-4 px-6",
            isOpen
              ? "bg-[#242D51]"
              : `hover:bg-[#DDF3FF] ${
                  theme === "blue"
                    ? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
                    : "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
                }`
          )}
        >
          {address ? shortenAddress(address) : "Connect error"}
        </button>
      )}
      <article
        className={cn(
          "w-fit min-w-[340px] sm:min-w-[400px] flex flex-col h-fit z-[100000]",
          "fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[1]",
          "rounded-[10px] duration-500 pb-6 px-4 pt-4 border-2",
          theme === "blue"
            ? "bg-primary border-secondary"
            : "bg-primary-revert border-secondary-revert",
          isOpen ? "opacity-[1] scale-y-[1]" : "opacity-[0] scale-y-[0]"
        )}
      >
        <div
          className={cn(
            "flex-row items-center justify-between p-4 relative z-[100000]",
            "after:absolute after:bottom-0 after:-left-4 after:w-[calc(100%+32px)] after:h-[1px] after:bg-black"
          )}
        >
          <h3 className="text-xl text-secondary font-[DM+Sans] font-bold">
            Account Details
          </h3>
          <CloseIcon onClick={close} />
        </div>
        <div className="py-4 px-0 sm:px-6 gap-6">
          <div
            className={cn(
              "gap-[10px] border rounded-[10px] p-[15px]",
              theme === "blue" ? "border-secondary" : "border-secondary-revert"
            )}
          >
            <div
              className={cn(
                "grid grid-cols-[43px_auto] items-center",
                "text-sm text-[#212121] font-semibold font-[DM+Sans]"
              )}
            >
              <ProfileIcon />
              {address && shortenAddress(address)}
            </div>
            <div
              className={cn(
                "flex-row justify-between items-center gap-8 px-[5px]",
                "text-sm leading-[100%] font-[DM+Sans]",
                theme === "blue" ? "text-secondary" : "text-secondary-revert"
              )}
            >
              <span className="flex items-center gap-2">
                <CopyIcon
                  className={cn(
                    "duration-500",
                    theme === "blue"
                      ? "text-secondary"
                      : "text-secondary-revert"
                  )}
                  onClick={() =>
                    navigator.clipboard.writeText(address as string)
                  }
                />
                Copy address
              </span>
              <span className="flex items-center gap-2">
                <ViewIcon
                  className={cn(
                    "duration-500",
                    theme === "blue"
                      ? "text-secondary"
                      : "text-secondary-revert"
                  )}
                />{" "}
                View on explorer
              </span>
            </div>
          </div>
          <div className="flex-row items-center justify-between gap-[10px]">
            <span className="text-[#212121] text-sm font-[DM+Sans]">
              Connected with {chain?.name}
            </span>
            <button
              onClick={() => {
                disconnect();
                setOpenWallet(false);
                setChainId(null);
                close();
              }}
              className={cn(
                "py-[14px] px-4 border border-[#FF8989] bg-[#FFE1E1] rounded-[10px]",
                "leading-[125%] text-base text-[#212121] font-[DM+Sans]"
              )}
            >
              Disconnect
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
