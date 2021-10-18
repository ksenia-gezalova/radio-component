import RadioGroup from '@/components/RadioGroup'
import Radio from '@/components/Radio'

export default {
  title: 'Components/Radio',
  component: RadioGroup,
  argTypes: {
    value: {
      control: {
        disable: true
      }
    }
  }
}

export const Standard = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { RadioGroup, Radio },
    data: () => ({
      model: 'radio-1'
    }),
    template: `
      <radio-group
        v-bind="$props"
        v-model="model"
      >
        <radio
          label="Radio 1"
          value="radio-1"
          readonly
        />
        <radio
          label="Radio 2"
          value="radio-2"
        />
      </radio-group>
    `
  }
}
