import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import DatetimePicker from '@/components/DatetimePicker/index.vue';

describe('datetime-picker', () => {
  it('finsished render', () => {
    const wrapper = mount(DatetimePicker);
    const html = wrapper.html();
    expect(html).contain('class="ar-datetime-picker"');
    expect(html).contain('class="ar-datetime-picker-header"');
    expect(html).contain('class="ar-datetime-picker-select"');
    expect(html).contain('class="ar-datetime-picker-body"');
    expect(html).contain('class="ar-datetime-picker-footer"');
  });

  it('toggle select', async () => {
    const wrapper = mount(DatetimePicker);
    await wrapper.find('.ar-datetime-picker-time-select').trigger('click');
    expect(wrapper.html()).contain('class="ar-datetime-picker-column"');
  });

  it('toggle select year', async () => {
    const wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'year',
      },
    });
    await wrapper.find('.ar-datetime-picker-time-select').trigger('click');
    expect(wrapper.html()).contain('class="ar-datetime-picker-year"');
  });

  it('toggle select month', async () => {
    const wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'month',
      },
    });
    await wrapper.find('.ar-datetime-picker-time-select').trigger('click');
    expect(wrapper.html()).contain('class="ar-datetime-picker-month"');
  });

  it('toggle select day', async () => {
    const wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'day',
      },
    });
    await wrapper.find('.ar-datetime-picker-time-select').trigger('click');
    expect(wrapper.html()).contain('class="ar-datetime-picker-day"');
  });
});
