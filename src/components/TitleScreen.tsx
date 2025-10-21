import { ScreenModeProps } from "./ScreenMode";

export default function TitleScreen(props: ScreenModeProps) {
    const {gameState,setGameState} = props;
    return (
        <>
            <button 
                onClick={() => setGameState('playing')}
                className="bg-blue-200 hover:bg-blue-300 rounded items-center justify-center flex flex-col m-4 p-2"
            >
                ゲームスタート
            
            </button>
            <div>
                タイトル画面コンポーネント
            </div>
        </>    
    );
}