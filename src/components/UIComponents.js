import React, { useState } from 'react'
import styled from '@emotion/styled'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import useMarkdown from '../utils/useMarkdown'
import PropTypes from 'prop-types'

const ExtraInfo = ({ title }) => {
  const mdx = useMarkdown(title)
  const [isOpen, setIsOpen] = useState(false)

  if (typeof mdx === 'object') {
    return (
      <div>
        <InfoHeader onClick={() => setIsOpen(!isOpen)}>
          {mdx.fields.title}
        </InfoHeader>

        {isOpen && <MDXRenderer>{mdx.body}</MDXRenderer>}
      </div>
    )
  }

  return
}

export const Exercise = ({ title, children }) => {
  return (
    <ExerciseContainer>
      <ExerciseTitle>{title}</ExerciseTitle>
      {children}
      <ExtraInfo title={'Submission Instructions'} />
      <ExtraInfo title={'How to see the solution'} />
    </ExerciseContainer>
  )
}

export const Note = ({ children }) => {
  return (
    <NoteContainer>
      <NoteTitle>Note!</NoteTitle>
      {children}
    </NoteContainer>
  )
}

Exercise.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

ExtraInfo.propTypes = {
  title: PropTypes.string.isRequired,
}

Note.propTypes = {
  children: PropTypes.string.isRequired,
}

const ExerciseContainer = styled.div`
	box-sizing: border-box;
    margin-top: 2rem;
    min-width: 0;
    padding: 16px;
    padding-left: 12px;
    border-left-width: 4px;
    border-left-style: solid;
    border-left-color: ${p => p.theme.colors.exercise};
    border-radius: 4px;
    background-color: ${p => p.theme.colors.highlight};
}
`

const ExerciseTitle = styled.div`
  font-size: 1.5rem;
  color: ${p => p.theme.colors.exercise};
  margin-bottom: 1rem;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.theme.colors.borderColor};
`

const NoteContainer = styled.div`
	box-sizing: border-box;
    margin-top: 2rem;
    min-width: 0;
    padding: 16px;
    padding-left: 12px;
    border-left-width: 4px;
    border-left-style: solid;
    border-left-color: ${p => p.theme.colors.primary};
    border-radius: 4px;
    background-color: ${p => p.theme.colors.highlight};
}
`

const NoteTitle = styled.div`
  font-size: 1.2rem;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 1rem;
`

const InfoHeader = styled.h4`
  margin: 0px !important;
  color: ${p => p.theme.colors.exercise};
  &:hover,
  &:focus,
  &.is-active {
    color: ${p => p.theme.colors.primary};
  }
`
