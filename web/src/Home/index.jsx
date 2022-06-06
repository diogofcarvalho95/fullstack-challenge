import { useState, useEffect } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { useFormik } from 'formik'
import { axios } from 'axios'

function TweetForm ({loggedInUser, onSuccess}) {
  const MAX_TWEET_CHAR = 250;
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios.post(`${import.meta.env.VITE_API_HOST}tweets`, {
        text: values.text
      }, {
        headers: {
          'authorization': `Bearer ${loggedInUser.accessToken}`
        }
      })
      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })

  function changeText(e) {
    setText(e.target.value)
  }

  return (
    <div className="border-b border-silver p-4 space-y-4">
      <div className="flex p-4 space-x-5">
        <img src="./imgs/avatar1.svg" className="w-7" alt="My avatar"/>
        <h1 className="font-bold text-xl">Página inicial</h1>
      </div>
      <form className="flex flex-col pl-12 text-lg" onSubmit={formik.handleSubmit}>
        <textarea
          name="tweet"
          placeholder="O que está a acontecer?"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          className="bg-transparent outline-none disabled:opacity-50"
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">{formik.values.text.length} / <span className="text-blue">{MAX_TWEET_CHAR}</span></span>
          <button
            type="submit"
            className="bg-blue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
          >Tweet</button>
        </div>
      </form>
    </div>
  )
}

const Tweet = ({ name, username, avatar, verified, followers, children }) => {
  return (
    <div className="flex items-center space-x-3 p-4 border-b border-silver">
      <img src={"./imgs/" + avatar + ".svg"} width="48" alt={name}/>
      <div className="space-y-1">
        <div className="flex space-x-1 text-sm">
          <span className="font-bold">{name}</span>
          {verified === "yes" &&
            <img src="./imgs/verified.svg" alt="Verified user" width="16"/>
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

export function Home ({ loggedInUser }) {
  const [data, setData] = useState([])

  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}tweets`, {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    console.log(res.data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="">
      <TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
      <div>
        {data && data.map((tweet) => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="avatar1" verified="yes" followers="1.2M">
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </div>
  )
}
