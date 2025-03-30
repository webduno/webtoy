import { GameButton } from "../atom/game/GameButton";

interface Template {
  name: string;
  description: string;
}

interface TemplatesModalProps {
  templates: Template[];
  onLoadTemplate: (templateName: string) => void;
  onClose: () => void;
}

export default function TemplatesModal({
  templates,
  onLoadTemplate,
  onClose
}: TemplatesModalProps) {
  return (
    <div className="pos-abs tx-shadow-5 text-center p-4 tx-white bord-r-5 pa-4 w-300px flex-justify-start autoverflow-y gap-3 h-max-300px pos-abs flex-col flex-align-center " style={{
      boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
      background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
      zIndex: 1000,
    }}>
      <div className=" tx-white opaci-75 tx-ls-3 pb-4 tx-altfont-4 tx-mdl">TEMPLATES</div>
      <div className="flex-wrap gap-3 w-100">
        {templates.map((template, index) => (
          <button 
            key={index}
            onClick={() => onLoadTemplate(template.name)}
            // style={{
            //   background: "linear-gradient(170deg,#00000000, #00000077, #444444cc)",
            // }}
            // className='noborder flex-col tx-altfont-1  bg-trans w-250px tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1  bord-r-10'
            className='game-list-item  py-1 bord-r-10 pointer'
          >
            {/* {template.name} */}
            <span className='tx-md opaci- tx-lg w-100px block  nodeco tx-altfont-4 tx-white flex-col'>
              <div>{template.description.split("#")[0]}</div>
              {/* <br /> */}
              <div>{template.description.split("#")[1]}</div>
            </span>
          </button>
        ))}
      </div>
      <GameButton 
          type="zeta"
          onClick={onClose}
          classOverride="px-2 ma-1 pos-abs top-0 right-0 tx-lg tx-shadow-5 bord-r-100"
          styleOverride={{ 
            zIndex: 1001,
          }}
        >
          ✕
        </GameButton>
      {/* <button 
        onClick={onClose}
        className='noborder border-white bord-r-10 bg-trans tx-white tx- mt- py-2 opaci-chov--25 opaci-50 tx-shadow-5 tx-altfont-1'
      >
        Close Templates
      </button>  */}
    </div>
  );
} 