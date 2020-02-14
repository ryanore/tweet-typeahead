import React, {useState} from 'react'
import { useApiGet } from "./useApi"
import { cleanup, fireEvent, render, wait } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { userSearchUrl } from '../config/urls'

describe('useApi useApiGet() Hook', () => {
  
  const responseData = JSON.stringify([{ id: 1 }])

  describe('With a url', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('it toggles loading state correctly', async () => {
      fetch.mockResponseOnce(JSON.stringify(responseData));
      const { result, waitForNextUpdate } = renderHook(() => useApiGet(userSearchUrl+'test'))
      
      expect(result.current.loading).toBe(true)
      await waitForNextUpdate()
      expect(result.current.loading).toBe(false)
    })
  })

  describe('With a good response', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('it sets state correctly', async () => {
      fetch.mockResponseOnce(JSON.stringify(responseData));
      const { result, waitForNextUpdate } = renderHook(() => useApiGet(userSearchUrl+'test'))
      
      expect(result.current.data).toBe(null)
      await waitForNextUpdate()
      expect(result.current.data).toMatch(responseData)
      expect(result.current.error).toBe(null)
      expect(result.current.loading).toBe(false)
    })
  })

  describe('With an error response', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('it handles state correctly', async () => {
      fetch.mockReject(new Error('fake error message'))
      const { result, waitForNextUpdate } = renderHook(() => useApiGet(userSearchUrl+'test'))
      
      expect(result.current.error).toBe(null)
      await waitForNextUpdate()
      expect(result.current.error).toBeTruthy()
      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
    })
  })
  
})
