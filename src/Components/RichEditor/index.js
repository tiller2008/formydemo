import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import DropOrPasteImages from 'slate-drop-or-paste-images';

import { isKeyHotkey } from 'is-hotkey';
import { Button, Toolbar } from './components'
import Image from './Image';
import initialValue from './value.json'
import './index.less';

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

// Add the plugin to your set of plugins...
const plugins = [
    DropOrPasteImages({
        extensions: ['png'],
        insertImage: (transform, file) => {
            return transform.insertBlock({
                type: 'image',
                isVoid: true,
                data: { file }
            })
        }
    })
]

// let schema = {
//     nodes: {
//         image: Image
//     }
// }

export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Value.fromJSON(initialValue)
            // value: ''
        };
    }

    /**
       * Check if the current selection has a mark with `type` in it.
       *
       * @param {String} type
       * @return {Boolean}
       */

    hasMark = type => {
        const { value } = this.state
            return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const { value } = this.state
            return value.blocks.some(node => node.type === type)
    }

    render() {
        return (
            <div className='blank'>
                <Toolbar>
                    {this.renderMarkButton('bold', 'icon-bold', '粗体')}
                    {this.renderMarkButton('italic', 'icon-italic', '斜体')}
                    {this.renderMarkButton('underlined', 'icon-underline', '下划线')}
                    {this.renderMarkButton('code', 'icon-code', '代码块')}
                    {this.renderBlockButton('heading-one', 'icon-H', 'H1')}
                    {this.renderBlockButton('heading-two', 'icon-H1', 'H2')}
                    {this.renderBlockButton('block-quote', 'icon-quote', '引用')}
                    {this.renderBlockButton('numbered-list', 'icon-orderedlist', '有序列表')}
                    {this.renderBlockButton('bulleted-list', 'icon-unorderedlist', '无序列表')}
                </Toolbar>
                <Editor
                    spellCheck
                    autoFocus
                    placeholder="Enter some rich text..."
                    value={this.state.value}
                    plugins={plugins}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                />
            </div>
        )
    }

    /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

    renderMarkButton = (type, icon, alt) => {
        const isActive = this.hasMark(type)

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <i className={`iconfont ${icon}`} alt={alt} />
            </Button>
        )
    }

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon, alt) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value } = this.state
                const parent = value.document.getParent(value.blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
        }

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <i className={`iconfont ${icon}`} alt={alt} />
            </Button>
        )
    }

    renderNode = props => {
        const { attributes, children, node } = props

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            case 'image':
                return <Image {...props} />
            default:
                return null;
        }
    }

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderMark = props => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return null;
        }
    }

    /**
     * On change, save the new `value`.
     *
     * @param {Change} change
     */

    onChange = ({ value }) => {
        this.setState({ value })
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Change} change
     * @return {Change}
     */

    onKeyDown = (event, change) => {
        let mark

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return
        }

        event.preventDefault()
        change.toggleMark(mark)
        return true
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change().toggleMark(type)
        this.onChange(change)
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change()
        const { document } = value

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                change
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                change.setBlocks('list-item').wrapBlock(type)
            }
        }

        this.onChange(change)
    }
}