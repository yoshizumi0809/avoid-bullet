import { ScreenModeProps } from "./ScreenMode";

export default function TitleScreen(props: ScreenModeProps) {
    const { setGameState } = props;
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-white z-50">
            <h1 className="text-6xl font-bold text-blue-500 mb-12 tracking-widest drop-shadow-lg">
                弾幕避けゲーム
            </h1>

            <button 
                onClick={() => setGameState('playing')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded shadow-lg transition-transform transform hover:scale-105"
            >
                🚀 ゲームスタート
            </button>

            <div className="mt-8 text-gray-400 text-sm text-center">
                <p>WASDキーで移動して</p>
                <p>弾を避け続けろ！</p>
            </div>
        </div>    
    );
}