import React, { Suspense } from 'react'
import { useImage } from 'react-image'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'

function ImageComponent (props) {
  const { srcList, alt, ...rest } = props
  const { src } = useImage({
    srcList: srcList,
    useSuspense: false,
  })

  return <img src={src} alt={alt} {...rest} />
}

function ErrorFallback ({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function SuspenseImage (props) {
  const { src, ...rest } = props
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <Suspense>
        <ImageComponent
          srcList={src}
          {...rest}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

/**
 *
 * @type {{alt: Validator<NonNullable<string>>, srcList: Validator<NonNullable<string>>}}
 */
SuspenseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default SuspenseImage