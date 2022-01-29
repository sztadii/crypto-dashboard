import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// The react-query package allow us to retry failing requests
// So sometimes we need to wait a bit longer for the results
configure({ asyncUtilTimeout: 3_000 })
