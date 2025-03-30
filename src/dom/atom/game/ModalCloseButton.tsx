import { GameButton } from './GameButton';

export const ModalCloseButton = ({ onClose }: { onClose: () => void; }) => {
  return (
    <GameButton
      type="zeta"
      onClick={onClose}
      classOverride="px-2 ma-1 pos-abs top-0 right-0 tx-lg tx-shadow-5 bord-r-100"
      styleOverride={{
        transform: "translate(50%, -50%)",
        zIndex: 1001,
      }}
    >
      ✕
    </GameButton>
  );
};
