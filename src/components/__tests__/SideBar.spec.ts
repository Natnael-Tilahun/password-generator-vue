import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SideBarVue from '../SideBar.vue'

describe('Sidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(SideBarVue)
    expect(wrapper.text()).toContain('Generate a random password')
  })
})
