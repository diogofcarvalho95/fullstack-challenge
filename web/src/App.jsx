import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'

const TweetForm = () => {
  const MAX_TWEET_CHAR = 250;
  const [text, setText] = useState('')
  function changeText(e) {
    setText(e.target.value)
  }
  return (
    <div className="border-b border-silver p-4 space-y-4">
      <div className="flex p-4 space-x-5">
        <img src="./src/imgs/avatar1.svg" className="w-7" alt="My avatar"/>
        <h1 className="font-bold text-xl">Página inicial</h1>
      </div>
      <form className="flex flex-col pl-12 text-lg">
        <textarea
          name="tweet"
          placeholder="O que está a acontecer?"
          value={text}
          onChange={changeText}
          className="bg-transparent outline-none disabled:opacity-50"
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">{text.length} / <span className="text-blue">{MAX_TWEET_CHAR}</span></span>
          <button
            className="bg-blue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
          >Tweet</button>
        </div>
      </form>
    </div>
  )
}

const Tweet = ({ name, username, avatar, verified, followers, children }) => {
  return (
    <div className="flex items-center space-x-3 p-4 border-b border-silver">
      <img src={"./src/imgs/" + avatar + ".svg"} width="48" alt={name}/>
      <div className="space-y-1">
        <div className="flex space-x-1 text-sm">
          <span className="font-bold">{name}</span>
          {verified === "yes" &&
            <img src="./src/imgs/verified.svg" alt="Verified user" width="16"/>
          }
          <span className="text-silver">@{username}</span>
        </div>
        <p>{children}</p>
        <div className="flex items-center space-x-1 text-silver text-sm">
          <HeartIcon className="w-5 stroke-1"/>
          <span>{followers}</span>
        </div>
      </div>
    </div>
  )
}

export const App = () => {
  return (
    <>
      <TweetForm/>
      <div>
        <Tweet name="Elon Musk" username="elonmusk" avatar="avatar1" verified="yes" followers="1.2M">
          Let’s make Twitter maximun fun!
        </Tweet>
        <Tweet name="Diogo Carvalho" username="diogocarvalho" avatar="avatar2" verified="no" followers="2.5k">
          Let’s make Twitter maximun awesome!
        </Tweet>
      </div>
    </>
  )
}
