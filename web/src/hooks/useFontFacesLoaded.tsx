import { useEffect, useState } from 'react'

import FontFaceObserver from 'fontfaceobserver'

export const useFontFacesLoaded = () => {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await new FontFaceObserver('DM Sans').load()
        await new FontFaceObserver('Libre Baskerville').load()
        await new FontFaceObserver('Bricolage Grotesque').load()
      } catch (error) {
        //
      }

      setLoaded(true)
    }

    loadFonts()
  }, [])

  return loaded
}
